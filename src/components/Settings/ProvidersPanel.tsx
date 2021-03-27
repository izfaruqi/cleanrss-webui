import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Empty, Form, Input, message, Popconfirm, Select } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { Cleaner, Provider, refreshProviders, reqAddProvider, reqDeleteProvider, reqModifyProvider } from "../../api";
import { NumberMap, RootState } from "../../state/state";
import HBar from "../utils/dividers/HBar";

type Props = {
  providers?: Provider[]
  providersMap?: NumberMap<Provider>,
  cleaners?: Cleaner[],
}

function mapStateToProps(state: RootState){
  return { providers: state.providers, providersMap: state.providersMap, cleaners: state.cleaners }
}

function ProvidersPanel({ providers, providersMap, cleaners }: Props){
  const [editingId, setEditingId] = useState<number | undefined>(undefined) // -1: initial, -2: new, >= 0: editing
  const [isEditing, setIsEditing] = useState(true)
  const [fName, setFName] = useState("")
  const [fUrl, setFUrl] = useState("")
  const [fCleaner, setFCleaner] = useState(0)

  const onProviderSelectChange = (value: number) => {
    setEditingId(value)
    setFName(providersMap? providersMap[value].name : "")
    setFUrl(providersMap? providersMap[value].url : "")
    setFCleaner(providersMap? providersMap[value].parserId : -1)
  }

  const reset = () => {
    setEditingId(undefined)
    setFName("")
    setFUrl("")
    setFCleaner(0)
  }

  const deleteProvider = async () => {
    if(editingId === undefined) return
    const status = (await reqDeleteProvider(editingId)).status
    if(status == 200){
      refreshProviders()
      message.success(providersMap![editingId].name + " deleted successfully.")
      reset()
    } else {
      message.error("Failed to delete provider.")
    }
  }

  const submitProvider = async () => {
    const providerToSubmit: Provider = { id: editingId!, name: fName, url: fUrl, parserId: fCleaner, is_deleted: false }
    let status: number
    
    if(isEditing){
      status = (await reqModifyProvider(providerToSubmit)).status
    } else {
      status = (await reqAddProvider(providerToSubmit)).status
    }
    if(status == 200){
      refreshProviders()
      message.success(providerToSubmit.name + (isEditing? " edited" : " added") + " successfully.")
      if(!isEditing) { setIsEditing(true); reset() }
    } else {
      message.error("Failed to " + (isEditing? "edit" : "add") + " provider.")
    }
  }

  const standardFilter = (input: string, option: any) => (option.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0

  const form = (
    <Form
      labelCol={{ span: 3 }}
    >
      <Form.Item label="Name">
        <Input size="small" value={fName} onChange={e => setFName(e.target.value)}/>
      </Form.Item>
      <Form.Item label="URL">
        <Input size="small" value={fUrl} onChange={e => setFUrl(e.target.value)}/>
      </Form.Item>
      <Form.Item label="Cleaner">
        <Select showSearch filterOption={standardFilter} value={fCleaner} onChange={(e) => setFCleaner(e)} size="small">
          {cleaners?.map(cleaner => <Select.Option key={cleaner.id} value={cleaner.id}>{cleaner.name}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 3 }}>
        <div style={{ display: 'flex' }}>
          {isEditing? <Popconfirm title="Are you sure?" color="red" onConfirm={deleteProvider}><Button size="small" danger>Delete</Button></Popconfirm> : <Button size="small" onClick={() => { setIsEditing(true); reset() }}>Cancel</Button> }
          <div style={{ flexGrow: 1 }} />
          <Button type="primary" size="small" onClick={submitProvider}>Save</Button>
        </div>
      </Form.Item>
    </Form>
  )

  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
    <div style={{ display: 'flex'}}>
      <Select value={editingId} onSelect={(v) => onProviderSelectChange(v as number)} disabled={!isEditing} 
        placeholder={isEditing? "Select a provider..." : "Creating a new provider..."} style={{ flexGrow: 1 }} bordered={false} 
        showSearch filterOption={standardFilter}>
        {providers?.map(provider => <Select.Option key={provider.id} value={provider.id}>{provider.name}</Select.Option>)}
      </Select>
      <Button type="text" onClick={() => { setIsEditing(false); reset() }}><FontAwesomeIcon icon="plus" /></Button>
    </div>
    <HBar></HBar>
    <div style={{ flexGrow: 1, padding: 10, paddingBottom: 0 }}>
      {editingId !== undefined || !isEditing? form : <Empty style={{ marginBottom: 20 }} description="Select a provider."></Empty> }
    </div>
  </div>
}

export default connect(mapStateToProps)(ProvidersPanel)