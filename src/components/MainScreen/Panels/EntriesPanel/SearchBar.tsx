import { DatePicker, Input } from "antd";
import { useState } from "react";
import VBar from "../../../utils/dividers/VBar";

type Props = {
  onSearch(query: string): void
}

export default function SearchBar({ onSearch }: Props){
  const [query, setQuery] = useState("")
  return <div style={{ display: 'flex' }}>
    <Input style={{ flexGrow: 1 }} bordered={false} placeholder="Search..." onKeyUp={(e) => e.key === "Enter" && onSearch(query)} value={query} onChange={e => setQuery(e.target.value)} />
    <VBar />
    <DatePicker.RangePicker style={{ flexGrow: 1 }} showTime showSecond={false} format="YYYY-MM-DD HH:mm" bordered={false} />
  </div>
}