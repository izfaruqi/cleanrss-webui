import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Form, Input, Menu, Select } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { Provider } from "../../api";
import { NumberMap, RootState } from "../../state/state";
import HBar from "../utils/dividers/HBar";

type Props = {
  providers?: Provider[]
  providersMap?: NumberMap<Provider>
}

function mapStateToProps(state: RootState){
  return { providers: state.providers, providersMap: state.providersMap }
}

function ProvidersPanel({ providers, providersMap }: Props){
  const [fName, setFName] = useState("")
  const [fUrl, setFUrl] = useState("")
  const [fCleaner, setFCleaner] = useState("")

  const onProviderSelectChange = (value: number) => {
    setFName(providersMap? providersMap[value].name : "")
    setFUrl(providersMap? providersMap[value].url : "")
  }

  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
    <div style={{ display: 'flex'}}>
      <Select onSelect={(v) => onProviderSelectChange(v as number)} placeholder="Select a provider..." style={{ flexGrow: 1 }} bordered={false} showSearch >
        {providers?.map(provider => <Select.Option value={provider.id}>{provider.name}</Select.Option>)}
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
          <Select size="small">
            <Select.Option value="1">Cleaner 1</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3 }}>
          <div style={{ display: 'flex' }}>
            <Button size="small">Save</Button>
            <div style={{ flexGrow: 1 }} />
            <Button size="small" danger>Delete</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default connect(mapStateToProps)(ProvidersPanel)