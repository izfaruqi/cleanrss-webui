import { Card, Tag, Button } from "antd";
import { useState } from "react";
import SettingsModal from "./Settings/SettingsModal";

export default function TitleBar(){
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  return (
    <Card bodyStyle={{paddingTop: 5, paddingBottom: 5, display: "flex", alignItems: "baseline"}}>
      <h4 style={{textAlign: "center", margin: 0}}>CleanRSS</h4>
      <Tag style={{marginLeft: 5}}>v0.1.0</Tag>
      <Button size="small" type="text" onClick={() => setIsSettingsModalOpen(true)}>Settings</Button>
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)}></SettingsModal>
    </Card>
  )
}