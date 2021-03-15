import ProvidersPanel from "./Panels/ProvidersPanel";
import EntriesPanel from "./Panels/EntriesPanel/EntriesPanel";
import ReaderPanel from "./Panels/ReaderPanel";
import VBar from "../utils/dividers/VBar";

type Props = {
  style: React.CSSProperties
}

export default function Content({ style }: Props){
  return <div style={{ ...style, display: 'flex', minHeight: 0 }}>
    <div style={{ flexShrink: 1 }}><ProvidersPanel></ProvidersPanel></div>
    <VBar />
    <div style={{ flexGrow: 1, flexBasis: 1 }}><EntriesPanel></EntriesPanel></div>
    <VBar />
    <div style={{ flexGrow: 1, flexBasis: 1 }}><ReaderPanel></ReaderPanel></div>
  </div>
}