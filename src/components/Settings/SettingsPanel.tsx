import Modal from "antd/lib/modal/Modal";

type Props = {
  isOpen: boolean,
  onCancel(): void
}

export default function SettingsPanel({ isOpen, onCancel }: Props){
  return <Modal title="Settings" onCancel={onCancel} visible={isOpen}>
    
  </Modal>
}