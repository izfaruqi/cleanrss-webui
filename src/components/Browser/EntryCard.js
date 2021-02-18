import { Card } from "antd";
import { connect } from "react-redux";

function mapStringToProps(state){
  return { currentActiveEntryId: state.reader.entry.id }
}

function EntryCard({ currentActiveEntryId, item, onClick }){
  return (
    <Card onClick={() => onClick()} hoverable style={{borderColor: item.id == currentActiveEntryId? "#1890FF":null, boxShadow: item.id == currentActiveEntryId? "0px 0px 5px 2.5px rgba(24,144,255,0.5)":null}} bodyStyle={{paddingTop: 5, paddingBottom: 5}} size="small" title={<div><div style={{whiteSpace: "break-spaces"}}>{item.title}</div></div>}>
      <div style={{display: 'flex'}}>
        <div style={{flexGrow: 1, fontSize: "smaller"}}>{item.author}</div>
        <div style={{textAlign: "right", fontSize: "smaller"}}>{(new Date(item.publishedAt*1000)).toLocaleString("en-GB")}</div>
      </div>
    </Card>
  )
}

export default connect(mapStringToProps, null)(EntryCard)