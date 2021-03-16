import { Card } from "antd"
import { format } from "date-fns"
import { Entry } from "../../../../api"
import HBar from "../../../utils/dividers/HBar"

type Props = {
  entry: Entry,
  providerName: string
}

export default function EntryCard({ entry, providerName }: Props){
  return <div>
    <Card bodyStyle={{ padding: 0 }}>
      <div style={{ display: 'flex', padding: "2.5px 10px 5px 10px" }}>
        <div style={{ fontSize: "smaller", color: "rgba(255,255,255,0.45)" }}>{providerName}</div>
      </div>
      <HBar />
      <div style={{ padding: "5px 10px 7.5px 10px" }}>{entry.title}</div>
      <HBar />
      <div style={{ display: 'flex', padding: "5px 10px 5px 10px", gap: 2 }}>
        <div style={{ flexGrow: 1, fontSize: "smaller", color: "rgba(255,255,255,0.85)" }}>{entry.author}</div>
        <div style={{ fontSize: "smaller", color: "rgba(255,255,255,0.45)" }}>{format(new Date(parseInt(entry.publishedAt) * 1000), "yyyy-MM-dd HH:mm")}</div>
      </div>
    </Card>
  </div>
}