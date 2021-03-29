import { Tag } from "antd"
import StatusIndicator from "../StatusIndicator"
import TopBarMenu from "./TopBarMenu"
import TopBarNotfication from "./TopBarNotification"

export default function TopBar(){
  return <div style={{ padding: "5px 10px", display: 'flex', gap: 10, alignItems: 'baseline' }}>
    <span>CleanRSS</span>
    <Tag style={{ cursor: 'pointer', userSelect: 'none' }}>v0.1.0</Tag>
    <TopBarMenu></TopBarMenu>
    <div style={{ flexGrow: 1 }}></div>
    <div style={{ marginRight: 5 }}><TopBarNotfication /></div>
    <StatusIndicator />
  </div>
}