import { Button, Row, Col, Layout, Card } from "antd";
import { Content } from "antd/lib/layout/layout";
import Browser from "./Browser/Browser";
import Reader from "./Reader/Reader";

export default function App(){
  return (
    <Layout>
      <Content>
        <Row>
          <Col span={16}>
            <Browser></Browser>
          </Col>
          <Col span={8}>
            <div style={{margin: 15, marginLeft: 5, height: "95vh"}}>
              <Reader></Reader>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}