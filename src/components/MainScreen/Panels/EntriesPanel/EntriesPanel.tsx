import { Moment } from "moment";
import { useEffect } from "react";
import { connect } from "react-redux";
import { loadEntriesFromProvider, loadEntriesFromSearch } from "../../../../api";
import { RootState } from "../../../../state/state";
import HBar from "../../../utils/dividers/HBar";
import EntriesList from "./EntriesList";
import SearchBar from "./SearchBar";

type Props = {
  browser?: {
    providerId?: number
  }
}

function mapStateToProps(state: RootState){
  return { browser: state.browser }
}

function EntriesPanel({ browser }: Props){
  useEffect(() => {
    loadEntriesFromProvider(browser?.providerId)
  }, [browser?.providerId])

  const onSearch = (query: string, dateTimeRange: [Moment, Moment]) => {
    if(query === "" && dateTimeRange === null) loadEntriesFromProvider(browser?.providerId)
    else loadEntriesFromSearch(query, dateTimeRange? dateTimeRange[0].unix() : undefined, dateTimeRange? dateTimeRange[1].unix() : undefined, browser?.providerId)
  }

  return <div style={{ height: "100%", display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
    <SearchBar onSearch={onSearch} />
    <HBar></HBar>
    <div style={{ flexGrow: 1, overflowY: 'auto'}}><EntriesList></EntriesList></div>
  </div>
}

export default connect(mapStateToProps)(EntriesPanel)