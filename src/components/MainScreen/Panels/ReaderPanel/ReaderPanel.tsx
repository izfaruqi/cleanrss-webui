import HBar from "../../../utils/dividers/HBar";
import InfoBar from "./InfoBar";
import Reader from "./Reader";

export default function ReaderPanel(){
  return <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ flexShrink: 1 }}><InfoBar /></div>
    <HBar></HBar>
    <div style={{ flexGrow: 1, overflow: 'auto' }}><Reader></Reader></div>
  </div>
}