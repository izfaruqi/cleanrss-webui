import VBar from "../../../utils/dividers/VBar";

const textFieldStyle: React.CSSProperties = { margin: 'auto 7px auto 7px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }

export default function InfoBar(){
  return <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', height: 28 }}>
      <div style={{ flexGrow: 2, ...textFieldStyle }}>Article Title</div>
      <VBar />
      <div style={{ flexGrow: 0, ...textFieldStyle }}>Author</div>
      <VBar />
      <div style={{ flexGrow: 0, ...textFieldStyle }}>2021-03-15 14:17</div>
      <VBar />
      <div style={{ flexGrow: 0, ...textFieldStyle }}>Publisher Name</div>
    </div>
  </div>
}