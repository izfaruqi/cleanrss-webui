import { Button, Row, Col, Layout, Card } from "antd";
import EntryList from "./EntryList";
import ProviderTree from "./ProviderTree";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddProviderModal from "./AddProviderModal";
import { useEffect, useState } from "react";

export default function Browser(){
  const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false)
  return (
    <Row>
      <Col span={6}>
        <div style={{margin: 15, marginRight: 0}}>
          <Card bodyStyle={{paddingTop: 5, paddingBottom: 5}} style={{marginBottom: 10}}>
            <h2 style={{margin: "auto", textAlign: "center"}}>CleanRSS</h2>
          </Card>
          <Card title={
            <div style={{display: "flex", justifyContent: 'space-between'}}>
              <div>Providers</div>
              <div>
                <Button style={{marginRight: 5}} type="default" size="small" icon={<FontAwesomeIcon icon={["fas", "cog"]}/>} onClick={() => setIsAddProviderModalOpen(true)} />
                <Button type="default" size="small" icon={<FontAwesomeIcon icon={["fas", "plus"]}/>} onClick={() => setIsAddProviderModalOpen(true)} />
              </div>
              <AddProviderModal isOpen={isAddProviderModalOpen} onClose={() => setIsAddProviderModalOpen(false)} />
            </div>
          } size="small">
            <ProviderTree></ProviderTree>
          </Card>
        </div>
      </Col>
      <Col span={18}>
        <div style={{margin: 15, marginRight: 0, paddingRight: 5, height: "95vh", overflowY: "auto", overflowX: "hidden"}}>
          <EntryList></EntryList>
        </div>
      </Col>
    </Row>
  )
}