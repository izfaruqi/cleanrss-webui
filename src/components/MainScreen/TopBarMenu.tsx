import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Menu } from "antd";
import { useState } from "react";
import SettingsPanel from "../Settings/SettingsPanel";

export default function TopBarMenu(){
  const [settingsOpen, setSettingsOpen] = useState(false)
  const menu = (<Menu>
    <Menu.Item onClick={() => setSettingsOpen(true)}>
      Settings
    </Menu.Item>
  </Menu>)

  return <div>
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button size="small">Menu <FontAwesomeIcon style={{ marginLeft: 5 }} icon="angle-down" /></Button>
    </Dropdown>
    <SettingsPanel isOpen={settingsOpen} onCancel={() => setSettingsOpen(false)}></SettingsPanel>
  </div>
}