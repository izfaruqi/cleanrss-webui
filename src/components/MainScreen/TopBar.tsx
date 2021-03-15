import { Tag } from "antd"

export default function TopBar(){
  return <div style={{ padding: "5px 10px", display: 'flex', gap: 10 }}>
    <span>CleanRSS</span>
    <Tag>v0.1.0</Tag>
  </div>
}