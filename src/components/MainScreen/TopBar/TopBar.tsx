import { Tag } from "antd"
import StatusIndicator from "../StatusIndicator"
import TopBarMenu from "./TopBarMenu"
import TopBarNotfication from "./TopBarNotification"

type Props = {
  className?: string
}

export default function TopBar({ className }: Props){
  return <div className={className} style={{ padding: "5px 10px", display: 'flex', gap: 10, alignItems: 'baseline' }}>
    <span>CleanRSS</span>
    <Tag className="electron-no-drag" style={{ cursor: 'pointer', userSelect: 'none' }}>v0.1.0</Tag>
    <TopBarMenu></TopBarMenu>
    <div style={{ flexGrow: 1 }}></div>
    <div className="electron-no-drag" style={{ marginRight: 5 }}><TopBarNotfication /></div>
    <StatusIndicator />
  </div>
}