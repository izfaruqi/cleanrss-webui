import ProvidersPanel from "./Panels/ProvidersPanel";
import EntriesPanel from "./Panels/EntriesPanel";
import ReaderPanel from "./Panels/ReaderPanel";


type Props = {
  style: React.CSSProperties
}

export default function Content({ style }: Props){
  return <div style={{ ...style, display: 'flex' }}>
    <div className="border-right"><ProvidersPanel></ProvidersPanel></div>
    <div className="border-right" style={{ flexGrow: 1 }}><EntriesPanel></EntriesPanel></div>
    <div style={{ flexGrow: 1.2 }}><ReaderPanel></ReaderPanel></div>
  </div>
}