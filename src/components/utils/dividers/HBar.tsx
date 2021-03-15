interface Props {
  style?: React.CSSProperties
}

export default function HBar({ style }: Props){
  return <div className="border-bottom" style={style}>
  </div>
}