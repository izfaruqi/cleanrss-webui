import { Button, Row, Col, Layout, Card, Tag } from "antd";
import { Content } from "antd/lib/layout/layout";
import Browser from "./Browser/Browser";
import Reader from "./Reader/Reader";
import TitleBar from "./TitleBar";

export default function App(){
  return (
    <Layout style={{height: "100vh", maxHeight: "100vh"}}>
      <Content style={{padding: 10, display: 'flex', flexDirection: 'column', height: "100%", gap: 5}}>
        <TitleBar></TitleBar>
        <div style={{flexGrow: 1, display: 'flex', gap: 5, flexBasis: 0, minHeight: 0}}>
          <div style={{flexGrow: 1, display: "flex", flexBasis: 0}}><Browser style={{flexGrow: 1}}></Browser></div>
          <div style={{flexGrow: 1, display: "flex", flexBasis: 0, minWidth: 0}}><Reader></Reader></div>
        </div>
      </Content>
    </Layout>
  )
}