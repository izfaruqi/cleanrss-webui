import { Button, Row, Col, Layout, Card } from "antd";
import EntryList from "./EntryList";
import ProviderTree from "./ProviderTree";

export default function Browser(){
  return (
    <Row>
      <Col span={6}>
        <div style={{margin: 15, marginRight: 0}}>
          <Card bodyStyle={{paddingTop: 5, paddingBottom: 5}} style={{marginBottom: 10}}>
            <h2 style={{margin: "auto", textAlign: "center"}}>CleanRSS</h2>
          </Card>
          <Card title="Providers" size="small">
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