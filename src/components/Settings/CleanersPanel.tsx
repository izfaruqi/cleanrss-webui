import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Empty, Form, Input, message, Popconfirm, Select } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { Cleaner, refreshProviders, reqAddCleaner, reqDeleteCleaner, reqModifyCleaner } from "../../api";
import { NumberMap, RootState } from "../../state/state";
import HBar from "../utils/dividers/HBar";

type Props = {
  cleanersMap?: NumberMap<Cleaner>,
  cleaners?: Cleaner[],
}

function mapStateToProps(state: RootState){
  return { cleanersMap: state.cleanersMap, cleaners: state.cleaners }
}

function CleanersPanel({ cleaners, cleanersMap }: Props){
  const [editingId, setEditingId] = useState<number | undefined>(undefined) // -1: initial, -2: new, >= 0: editing
  const [isEditing, setIsEditing] = useState(true)
  const [fName, setFName] = useState("")
  const [fRulesJson, setFRulesJson] = useState("")

  const onCleanerSelectChange = (value: number) => {
    setEditingId(value)
    setFName(cleanersMap? cleanersMap[value].name : "")
    setFRulesJson(cleanersMap? cleanersMap[value].rulesJson : "")
  }

  const reset = () => {
    setEditingId(undefined)
    setFName("")
    setFRulesJson("")
  }

  const deleteCleaner = async () => {
    if(editingId === undefined) return
    const status = (await reqDeleteCleaner(editingId)).status
    if(status == 200){
      refreshProviders()
      message.success(cleanersMap![editingId].name + " deleted successfully.")
      reset()
    } else {
      message.error("Failed to delete provider.")
    }
  }

  const submitCleaner = async () => {
    const cleanerToSubmit: Cleaner = { id: editingId!, name: fName, rulesJson: fRulesJson, is_deleted: false }
    let status: number
    
    if(isEditing){
      status = (await reqModifyCleaner(cleanerToSubmit)).status
    } else {
      status = (await reqAddCleaner(cleanerToSubmit)).status
    }
    if(status == 200){
      refreshProviders()
      message.success(cleanerToSubmit.name + (isEditing? " edited" : " added") + " successfully.")
      if(!isEditing) { setIsEditing(true); reset() }
    } else {
      message.error("Failed to " + (isEditing? "edit" : "add") + " cleaner.")
    }
  }

  const standardFilter = (input: string, option: any) => (option.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0

  const form = (
    <Form
      labelCol={{ span: 4 }}
    >
      <Form.Item label="Name">
        <Input size="small" value={fName} onChange={e => setFName(e.target.value)}/>
      </Form.Item>
      <Form.Item label="Rules JSON">
        <Input.TextArea size="small" value={fRulesJson} onChange={e => setFRulesJson(e.target.value)}/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <div style={{ display: 'flex' }}>
          <Button type="primary" size="small" onClick={submitCleaner}>Save</Button>
          <div style={{ flexGrow: 1 }} />
          {isEditing? <Popconfirm title="Are you sure?" color="red" onConfirm={deleteCleaner}><Button size="small" danger>Delete</Button></Popconfirm> : <Button size="small" onClick={() => { setIsEditing(true); reset() }}>Cancel</Button> }
        </div>
      </Form.Item>
    </Form>
  )

  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
    <div style={{ display: 'flex'}}>
      <Select value={editingId} onSelect={(v) => onCleanerSelectChange(v as number)} disabled={editingId == -2} 
        placeholder={isEditing? "Select a cleaner..." : "Creating a new cleaner..."} style={{ flexGrow: 1 }} bordered={false} 
        showSearch filterOption={standardFilter}>
        {cleaners?.map(cleaner => <Select.Option key={cleaner.id} value={cleaner.id}>{cleaner.name}</Select.Option>)}
      </Select>
      <Button type="text" onClick={() => { setIsEditing(false); reset() }}><FontAwesomeIcon icon="plus" /></Button>
    </div>
    <HBar></HBar>
    <div style={{ flexGrow: 1, padding: 10, paddingBottom: 0 }}>
      {editingId !== undefined || !isEditing? form : <Empty style={{ marginBottom: 20 }} description="Select a cleaner."></Empty> }
    </div>
  </div>
}

export default connect(mapStateToProps)(CleanersPanel)