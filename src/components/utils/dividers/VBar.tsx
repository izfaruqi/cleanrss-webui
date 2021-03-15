interface Props {
  style?: React.CSSProperties
}

export default function VBar({ style }: Props){
  return <div className="border-right" style={style}>
  </div>
}