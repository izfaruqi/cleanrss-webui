import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Input } from "antd";
import { Moment } from "moment";
import _ from "lodash";
import { useEffect, useState } from "react";
import VBar from "../../../utils/dividers/VBar";

type Props = {
  onSearch: (query: string, dateTimeRange: [Moment, Moment] | null) => void
}

export default function SearchBar({ onSearch }: Props){
  const [debouncedSearch] = useState<(query: string, dateTimeRange: [Moment, Moment] | null) => void>(() => _.debounce(onSearch, 250))
  const [isClean, setIsClean] = useState(true)
  const [query, setQuery] = useState("")
  const [dateTimeRange, setDateTimeRange] = useState<[Moment, Moment] | null>(null)

  useEffect(() => {
    if(query != "" || dateTimeRange != null){
      setIsClean(false)
    } else {
      setIsClean(true)
    }
    debouncedSearch(query, dateTimeRange)
  }, [query, dateTimeRange])
  

  const reset = () => { setQuery(""); setDateTimeRange(null) }

  return <div style={{ display: 'flex' }}>
    <div style={{ margin: 'auto 0px auto 7px' }}><FontAwesomeIcon style={{ display: 'block', opacity: 0.6, cursor: isClean? undefined : "pointer" }} onClick={() => !isClean && reset()} icon={isClean? "search" : "times-circle"} /></div>
    <Input style={{ flexGrow: 1 }} bordered={false} placeholder="Search..." onKeyUp={(e) => e.key === "Enter" && onSearch(query, dateTimeRange)} value={query} onChange={e => setQuery(e.target.value)} />
    <VBar />
    <DatePicker.RangePicker onChange={(date: any) => {setDateTimeRange(date)}} value={dateTimeRange} style={{ flexGrow: 1 }} showTime showSecond={false} format="YYYY-MM-DD HH:mm" bordered={false} />
  </div>
}