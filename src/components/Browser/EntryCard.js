import { Card } from "antd";

export default function EntryCard({ item, onClick }){
  return (
    <Card onClick={() => onClick()} hoverable bodyStyle={{paddingTop: 5, paddingBottom: 5}} size="small" title={<div><div style={{whiteSpace: "break-spaces"}}>{item.title}</div><br></br><div>{item.author}</div></div>}>
      <div style={{display: 'flex'}}>
        <div style={{flexGrow: 1, fontSize: "smaller"}}>{item.providerName}</div>
        <div style={{textAlign: "right", fontSize: "smaller"}}>{(new Date(item.publishedAt*1000)).toLocaleString("en-GB")}</div>
      </div>
    </Card>
  )
}