import { Card, Tag, Button, Popover } from "antd";
import { useState } from "react";
import SettingsModal from "./Settings/SettingsModal";
import StatusIndicator from "./StatusIndicator";

export default function TitleBar(){
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  return (
    <Card bodyStyle={{paddingTop: 5, paddingBottom: 5, display: "flex", alignItems: "baseline"}}>
      <h4 style={{textAlign: "center", margin: 0, userSelect: "none", cursor: "default"}}>CleanRSS</h4>
      <Popover content="You're on the latest version!" trigger="click">
        <Tag style={{marginLeft: 5, userSelect: "none", cursor: "pointer"}}>v0.1.0</Tag>
      </Popover>
      <Button size="small" type="text" onClick={() => setIsSettingsModalOpen(true)}>Settings</Button>
      <div style={{flexGrow: 1, display: "inline-flex", justifyContent: "flex-end", alignItems: "center"}}>
        <StatusIndicator></StatusIndicator>
      </div>
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)}></SettingsModal>
    </Card>
  )
}