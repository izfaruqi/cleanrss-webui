import { Card, Tag, Button } from "antd";

export default function TitleBar(){
  return (
    <Card bodyStyle={{paddingTop: 5, paddingBottom: 5, display: "flex", alignItems: "baseline"}}>
      <h4 style={{textAlign: "center", margin: 0}}>CleanRSS</h4>
      <Tag style={{marginLeft: 5}}>v0.1.0</Tag>
      <Button size="small" type="text">Settings</Button>
    </Card>
  )
}