import { Menu, MenuProps } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Key, useState } from "react";
import ProvidersPanel from "./ProvidersPanel";

type Props = {
  isOpen: boolean,
  onCancel(): void
}

type onSelectProps = {
  selectedKeys?: Key[]
}

export default function SettingsPanel({ isOpen, onCancel }: Props){
  const defaultMenu = "providers"
  const [selectedPanel, setSelectedPanel] = useState(defaultMenu)
  const onSelect = ({ selectedKeys }: onSelectProps) => {
    setSelectedPanel(selectedKeys? selectedKeys[0] as string : defaultMenu)
  }
  const activePanel = () => {
    if(selectedPanel == defaultMenu){
      return <ProvidersPanel></ProvidersPanel>
    }
  }
  return <Modal title="Settings" onCancel={onCancel} visible={isOpen} bodyStyle={{ padding: 0, display: 'flex', alignItems: 'stretch' }}>
    <Menu selectedKeys={[defaultMenu]} onSelect={e => onSelect(e)} theme="dark">
      <Menu.Item key="providers">
        Providers
      </Menu.Item>
    </Menu>
    <div style={{ flexGrow: 1 }}>
      {activePanel()}     
    </div>
  </Modal>
}