import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Form, Input, Menu, message, Select } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { Cleaner, Provider, refreshProviders, reqModifyProvider } from "../../api";
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
  const [editingId, setEditingId] = useState(-1)
  const [fName, setFName] = useState("")
  const [fUrl, setFUrl] = useState("")
  const [fCleaner, setFCleaner] = useState(0)

  const onProviderSelectChange = (value: number) => {
    setEditingId(value)
    setFName(providersMap? providersMap[value].name : "")
    setFUrl(providersMap? providersMap[value].url : "")
    setFCleaner(providersMap? providersMap[value].parserId : -1)
  }

  const submit = async () => {
    const providerToSubmit: Provider = { id: editingId, name: fName, url: fUrl, parserId: fCleaner, is_deleted: false }
    const req = (await reqModifyProvider(providerToSubmit)).status
    if(req == 200){
      refreshProviders()
      message.success(providerToSubmit.name + " edited successfully.")
    } else {
      message.error("Failed to edit provider.")
    }
  }

  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
    <div style={{ display: 'flex'}}>
      <Select onSelect={(v) => onProviderSelectChange(v as number)} placeholder="Select a provider..." style={{ flexGrow: 1 }} bordered={false} showSearch >
        {providers?.map(provider => <Select.Option key={provider.id} value={provider.id}>{provider.name}</Select.Option>)}
      </Select>
      <Button type="text"><FontAwesomeIcon icon="plus" /></Button>
    </div>
    <HBar></HBar>
    <div style={{ flexGrow: 1, padding: 10, paddingBottom: 0 }}>
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
          <Select value={fCleaner} onChange={(e) => setFCleaner(e)} size="small">
            {cleaners?.map(cleaner => <Select.Option key={cleaner.id} value={cleaner.id}>{cleaner.name}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3 }}>
          <div style={{ display: 'flex' }}>
            <Button size="small" onClick={submit}>Save</Button>
            <div style={{ flexGrow: 1 }} />
            <Button size="small" danger>Delete</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default connect(mapStateToProps)(ProvidersPanel)