import { Tag } from "antd"

type Props = {
  className: string
}

export default function TopBar({ className }: Props){
  return <div className={className} style={{ padding: "5px 10px", display: 'flex', gap: 10 }}>
    <span>CleanRSS</span>
    <Tag>v0.1.0</Tag>
  </div>
}