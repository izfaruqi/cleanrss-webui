import HBar from "../../../utils/dividers/HBar";
import EntriesList from "./EntriesList";
import SearchBar from "./SearchBar";

export default function EntriesPanel(){
  return <div style={{ height: "100%", display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
    <SearchBar />
    <HBar></HBar>
    <div style={{ flexGrow: 1, overflowY: 'auto'}}><EntriesList></EntriesList></div>
  </div>
}