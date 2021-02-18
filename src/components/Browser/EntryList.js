import { Card, List, Popover } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setReaderEntry, setReaderProviderIdx, setEntriesEntries } from "../../state/actions";
import EntryCard from "./EntryCard";

function mapStateToProps(state){
  return { providers: state.providers, entries: state.entries }
}

function EntryList({ providers, entries, dispatch }){
  const currentProviderName = providers.filter(provider => provider.id == entries.providerId)[0]?.name
  useEffect(() => {
    if(entries.providerIdx == -1) {
      return
    }
    console.log(entries.providerIdx)
    console.log(providers)
    updateEntries(providers[entries.providerIdx].id)
  }, [entries.providerIdx])

  const updateEntries = async (providerId) => {
    const entries = await fetch("http://localhost:1337/provider/" + providerId + "/entries").then(res => res.json())
    dispatch(setEntriesEntries(entries))
    console.log(entries)   
  }

  const onEntryClicked = (entry) => {
    dispatch(setReaderProviderIdx(entries.providerIdx))
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