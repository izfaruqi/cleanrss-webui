import { Button, Row, Col, Layout, Card } from "antd";
import EntryList from "./EntryList";
import ProviderTree from "./ProviderTree";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddProviderModal from "./AddProviderModal";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function Browser({ style }) {
  const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false)
  return (
    <div style={{display: "flex", gap: 5, alignItems: "stretch", ...style}}>
      <Card style={{flexGrow: 1}} title={
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <div>Providers</div>
          <div>
            <Button style={{ marginRight: 5 }} type="default" size="small" icon={<FontAwesomeIcon icon={["fas", "cog"]} />} onClick={() => setIsAddProviderModalOpen(true)} />
            <Button type="default" size="small" icon={<FontAwesomeIcon icon={["fas", "plus"]} />} onClick={() => setIsAddProviderModalOpen(true)} />
          </div>
          <AddProviderModal isOpen={isAddProviderModalOpen} onClose={() => setIsAddProviderModalOpen(false)} />
        </div>
      } size="small">
        <ProviderTree></ProviderTree>
      </Card>
      <div style={{ flexGrow: 8, flexBasis: 0, display: "flex", flexDirection: "column", gap: 5}}>
        <SearchBar></SearchBar>
        <div className={"custom-scrollbar"} style={{overflowY: "auto", overflowX: "hidden", flexGrow: 1, flexBasis: 0}}>
          <EntryList></EntryList>
        </div>
      </div>
    </div>
  )
}