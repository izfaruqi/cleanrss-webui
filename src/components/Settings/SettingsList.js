import { Menu } from "antd";

export default function SettingsList({ style, onSelectMenu }){

  return (
    <Menu style={{...style}} theme="dark" defaultSelectedKeys={["general"]} onClick={(e) => onSelectMenu(e.key)}>
      <Menu.Item key="general">General</Menu.Item>
      <Menu.Item key="providers">Providers</Menu.Item>
      <Menu.Item key="parsers">Parsers</Menu.Item>
    </Menu>
  )
}