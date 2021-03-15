import { Card } from "antd"

type CardData = {
  title: string,
  author: string
}

export default function EntriesList(){
  const entries: CardData[] = []
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 5, padding: 7 }}>
    {entries.map(entry => <Card title={entry.title}/>)}
  </div>
}