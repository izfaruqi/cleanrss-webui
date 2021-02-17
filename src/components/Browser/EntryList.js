import { Card, List, Popover } from "antd";
import { connect } from "react-redux";
import { setReaderEntry } from "../../state/actions";

function mapStateToProps(state){
  return { providers: state.providers, entries: state.entries }
}

function EntryList({ providers, entries, dispatch }){
  const currentProviderName = providers.filter(provider => provider.id == entries.providerId)[0]?.name
  const onEntryClicked = (entry) => {
    dispatch(setReaderEntry(entry))
  }
  return (
    <List grid={{ gutter: 8, column: 3 }} dataSource={entries.entries} renderItem={item => (
      <List.Item>
        <Card onClick={() => onEntryClicked(item)} hoverable bodyStyle={{paddingTop: 5, paddingBottom: 5}} size="small" title={<div><div style={{whiteSpace: "break-spaces"}}>{item.title}</div><br></br><div>{item.author}</div></div>}>
          <div style={{display: 'flex'}}>
            <div style={{flexGrow: 1, fontSize: "smaller"}}>{currentProviderName}</div>
            <div style={{textAlign: "right", fontSize: "smaller"}}>{(new Date(item.publishedAt*1000)).toLocaleString("en-GB")}</div>
          </div>
        </Card>
      </List.Item>
    )} />
  )
}

export default connect(mapStateToProps, null)(EntryList)