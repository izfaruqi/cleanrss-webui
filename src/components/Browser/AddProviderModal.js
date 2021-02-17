import { Form, Input, InputNumber, message, Modal } from "antd";
import { useState } from "react";

export default function AddProviderModal({ isOpen, onClose }){
  const [fName, setFName] = useState("")
  const [fUrl, setFUrl] = useState("")
  const [fParserId, setFParserId] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const onOk = async () => {
    setIsLoading(true)
    message.loading("Adding provider...")
    if(await fetch("http://localhost:1337/provider", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: fName, url: fUrl, parserId: fParserId })
     }).then(res => res.status) == 200){
      message.success("Provider added!")
     } else {
       message.error("An error occured :(")
     }
    setIsLoading(false)
    onCancel()
  }

  const onCancel = () => {
    if(!isLoading){
      onClose()
    }
  }

  return (
    <Modal
      visible={isOpen}
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      title="Add Provider"
    >
      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size="small"
      >
        <Form.Item label="Name">
          <Input value={fName} onChange={(e) => setFName(e.target.value)}></Input>
        </Form.Item>
        <Form.Item label="URL">
          <Input value={fUrl} onChange={(e) => setFUrl(e.target.value)}></Input>
        </Form.Item>
        <Form.Item label="Parser ID">
          <InputNumber value={fParserId} defaultValue={0} min={0} onChange={(v) => setFParserId(v)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}