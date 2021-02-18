import { Card, List, Popover } from "antd";
import { connect } from "react-redux";
import { setReaderEntry } from "../../state/actions";
import EntryCard from "./EntryCard";

function mapStateToProps(state){
  return { providers: state.providers, entries: state.entries }
}

function EntryList({ providers, entries, dispatch }){
  const currentProviderName = providers.filter(provider => provider.id == entries.providerId)[0]?.name
  const onEntryClicked = (entry) => {
    dispatch(setReaderEntry(entry))
  }
  return (   
    <List style={{flexGrow: 1, paddingRight: '0.5em'}} grid={{ gutter: 8, column: 3 }} dataSource={entries.entries} renderItem={item => (
      <List.Item>
        <EntryCard item={{...item, providerName: currentProviderName}} onClick={() => onEntryClicked(item)}></EntryCard>
      </List.Item>
    )} />
  )
}

export default connect(mapStateToProps, null)(EntryList)