import anime from 'animejs';
import { connect } from "react-redux"
import { Entry, Provider } from "../../../../api"
import { NumberMap, RootState } from "../../../../state/state"
import EntryCard from "./EntryCard"
import { useEffect } from 'react';

type Props = {
  entries?: Entry[],
  providersMap?: NumberMap<Provider>,
  readerEntry?: Entry
}

function mapStateToProps(state: RootState){
  return { entries: state.entries, providersMap: state.providersMap, readerEntry: state.reader?.entry }
}

function EntriesList({ entries, providersMap, readerEntry }: Props){
  console.log(entries)
  useEffect(() => {
    anime({
      targets: '.stagger-container .stagger-child',
      opacity: [0, 1],
      delay: anime.stagger(30)
    })
  }, [entries])
  return <div className="stagger-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 5, padding: 7 }}>
    {entries?.map(entry => <EntryCard className="stagger-child" key={entry.id} entry={entry} providerName={providersMap? providersMap[entry.providerId]?.name : ""} isClicked={entry.id === readerEntry?.id}></EntryCard>)}
  </div>
}

export default connect(mapStateToProps)(EntriesList)