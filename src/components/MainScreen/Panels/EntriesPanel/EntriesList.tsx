import { Card } from "antd"
import { connect } from "react-redux"
import { Provider } from "../../../../api"
import { RootState } from "../../../../state/state"
import EntryCard from "./EntryCard"

function mapStateToProps(state: RootState){
  return { entries: state.entries, providersMap: state.providersMap }
}

function EntriesList({ entries, providersMap }: RootState){
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 5, padding: 7 }}>
    {entries?.map(entry => <EntryCard entry={entry} providerName={providersMap? (providersMap[entry.providerId] as Provider).name : ""}></EntryCard>)}
  </div>
}

export default connect(mapStateToProps)(EntriesList)