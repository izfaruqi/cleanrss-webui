import { Button, Modal } from "antd";
import { useState } from "react";
import ProviderSettingsPanel from "./ProviderSettingsPanel";
import SettingsList from "./SettingsList";

export default function SettingsModal({ isOpen, onClose }){
  const [activePanel, setActivePanel] = useState("general")
  const panel = () => {
    switch(activePanel){
      case "general":
        return <div>GENERAL SETTINGS</div>
      case "providers":
        return <ProviderSettingsPanel></ProviderSettingsPanel>
      case "parsers":
        return <div>PARSER SETTINGS</div>
      default:
        return <div></div>
    }
  }
  return (
    <Modal bodyStyle={{padding: 0, display: 'flex', alignItems: 'stretch'}} visible={isOpen} onCancel={() => onClose()} title="Settings" footer={[<Button key="back" onClick={() => onClose()}>Close</Button>]}>
      <SettingsList style={{borderRight: "1px solid #303030"}} onSelectMenu={(selectedKey) => setActivePanel(selectedKey)}></SettingsList>
      <div style={{flexGrow: 1}}>
        {panel()}
      </div>
    </Modal>
  )
}