import { Menu, MenuProps } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Key, useState } from "react";
import VBar from "../utils/dividers/VBar";
import CleanersPanel from "./CleanersPanel";
import ProvidersPanel from "./ProvidersPanel";
import GeneralPanel from "./GeneralPanel";

type Props = {
  isOpen: boolean,
  onCancel(): void
}

type onSelectProps = {
  selectedKeys?: Key[]
}

export default function SettingsPanel({ isOpen, onCancel }: Props){
  const defaultMenu = "general"
  const [selectedPanel, setSelectedPanel] = useState(defaultMenu)
  const onSelect = ({ selectedKeys }: onSelectProps) => {
    setSelectedPanel(selectedKeys? selectedKeys[0] as string : defaultMenu)
  }
  const activePanel = () => {
    if(selectedPanel === defaultMenu){
      return <GeneralPanel></GeneralPanel>
    }
    if(selectedPanel === "providers"){
      return <ProvidersPanel></ProvidersPanel>
    }
    if(selectedPanel === "cleaners"){
      return <CleanersPanel></CleanersPanel>
    }
  }
  return <Modal title="Settings" onCancel={onCancel} visible={isOpen} bodyStyle={{ padding: 0, display: 'flex', alignItems: 'stretch' }}>
    <Menu selectedKeys={[selectedPanel]} onSelect={e => onSelect(e)} theme="dark">
      <Menu.Item key="general">
        General
      </Menu.Item>
      <Menu.Item key="providers">
        Providers
      </Menu.Item>
      <Menu.Item key="cleaners">
        Cleaners
      </Menu.Item>
    </Menu>
    <VBar />
    <div style={{ flexGrow: 1 }}>
      {activePanel()}     
    </div>
  </Modal>
}