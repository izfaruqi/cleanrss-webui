import { connect } from "react-redux"
import { Entry, Provider } from "../../../../api"
import { NumberMap, RootState } from "../../../../state/state"
import EntryCard from "./EntryCard"

type Props = {
  entries?: Entry[],
  providersMap?: NumberMap<Provider>,
  readerEntry?: Entry
}

function mapStateToProps(state: RootState){
  return { entries: state.entries, providersMap: state.providersMap, readerEntry: state.reader?.entry }
}

function EntriesList({ entries, providersMap, readerEntry }: Props){
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 5, padding: 7 }}>
    {entries?.map(entry => <EntryCard entry={entry} providerName={providersMap? providersMap[entry.providerId].name : ""} isClicked={entry.id === readerEntry?.id}></EntryCard>)}
  </div>
}

export default connect(mapStateToProps)(EntriesList)