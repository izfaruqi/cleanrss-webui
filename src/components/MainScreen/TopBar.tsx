import { Tag } from "antd"
import StatusIndicator from "./StatusIndicator"
import TopBarMenu from "./TopBarMenu"

export default function TopBar(){
  return <div style={{ padding: "5px 10px", display: 'flex', gap: 10, alignItems: 'baseline' }}>
    <span>CleanRSS</span>
    <Tag>v0.1.0</Tag>
    <TopBarMenu></TopBarMenu>
    <div style={{ flexGrow: 1 }}></div>
    <StatusIndicator />
  </div>
}