import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Select, Input, InputNumber, Form, message } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from 'lodash'
import { setParsers } from '../../state/actions'

function mapStateToProps(state){
  return { providers: state.providers, parsers: state.parsers }
}

function ProviderSettingsPanel({ providers, parsers, dispatch }){
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [isNewProvider, setIsNewProvider] = useState(false)
  const [fName, setFName] = useState("")
  const [fUrl, setFUrl] = useState("")
  const [fParser, setFParser] = useState("")

  useEffect(() => {
    updateParserList()
  }, [])

  useEffect(() => {
    if(selectedProvider != null){
      setFParser(_.findIndex(parsers, parser => parser.id == providers[selectedProvider].parserId).toString())
      setFName(providers[selectedProvider].name)
      setFUrl(providers[selectedProvider].url)
    }
  }, [selectedProvider])

  useEffect(() => {
    if(isNewProvider == true){
      setFParser("0")
      setFName("")
      setFUrl("")
    }
  }, [isNewProvider])

  const updateParserList = async () => {
    dispatch(setParsers(await fetch('http://localhost:1337/api/cleaner').then(res => res.json())))
  }

  const submitNewProvider = async () => {
    const providerJson = {
      name: fName,
      url: fUrl,
      parserId: parsers[fParser].id
    }

    const res = await fetch("http://localhost:1337/api/provider", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(providerJson)}).then(res => res.status)
    if(res == 200){
      message.success("Provider insert success.")
    } else {
      message.error("An error occured")
    }
    setSelectedProvider(null); setIsNewProvider(false)
  }

  const submitProviderChanges = async () => {
    const providerJson = {
      name: fName,
      url: fUrl,
      parserId: parsers[fParser].id
    }
    const res = await fetch("http://localhost:1337/api/provider/" + providers[selectedProvider].id, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(providerJson)}).then(res => res.status)
    if(res == 200){
      message.success("Provider insert success.")
    } else {
      message.error("An error occured")
    }
  }

  const form = () => {
    if(selectedProvider != null || isNewProvider){
      return (
        <Form
          style={{height: "100%"}}
          labelCol={{span: 3, style: {textAlign: "left"}}}
          layout="horizontal"
          size="small"
        >
          <Form.Item label="Name">
            <Input value={fName} onChange={(e) => setFName(e.target.value)}></Input>
          </Form.Item>
          <Form.Item label="URL">
            <Input value={fUrl} onChange={(e) => setFUrl(e.target.value)}></Input>
          </Form.Item>
          <Form.Item label="Parser">
            {parserSelect}
          </Form.Item>
          <Form.Item wrapperCol={{offset: 3}}>
            {formButtons(isNewProvider)}
          </Form.Item>
        </Form>
      )
    } else {
      return <div>Select a provider.</div>
    }
  }

  const formButtons = (isNew) => {
    if(isNew){
      return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Button type="primary" onClick={() => submitNewProvider()}>Save</Button>
          <Button onClick={() =>{setSelectedProvider(null); setIsNewProvider(false)}}>Cancel</Button>
        </div>
      )
    } else {
      return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Button type="primary" onClick={() => submitProviderChanges()}>Save</Button>
          <Button danger>Delete</Button>
        </div>
      )
    }
  }

  const parserSelect = (
    <Select
      onSelect={(v) => setFParser(v)}
      value={fParser}
      style={{flexGrow: 1}}
      showSearch
      placeholder="Select a parser..."
      >
      {parsers.map((parser, index) => (
        <Select.Option key={index}>{parser.name}</Select.Option>
      ))}
    </Select>
  )

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "stretch"}}>
      <div style={{borderBottom: "1px solid #303030", display: 'flex'}}>
        <Select
          disabled={isNewProvider}
          onSelect={(v) => setSelectedProvider(v)}
          value={selectedProvider}
          style={{flexGrow: 1}}
          showSearch bordered={false}
          placeholder={isNewProvider? "Creating a new provider." : "Select a provider..."}
          >
          {providers.map((provider, index) => (
            <Select.Option key={index}>{provider.name}</Select.Option>
          ))}
        </Select>
        <Button type="text" onClick={() => {setSelectedProvider(null); setIsNewProvider(true)}} icon={<FontAwesomeIcon icon={["fas", "plus"]}></FontAwesomeIcon>}>
        </Button>
      </div>
      <div style={{flexGrow: 1, margin: 16, marginBottom: 0}}>
        {form()}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, null)(ProviderSettingsPanel)