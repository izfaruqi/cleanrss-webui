import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, DatePicker, Input } from "antd";

export default function SearchBar(){
  return <Card size="small" bodyStyle={{padding: 0, display: 'flex', alignItems: "stretch"}}>
    <div style={{flexGrow: 1, borderRight: "1px solid #303030", display: 'flex', alignItems: "center"}}>
      <FontAwesomeIcon icon={["fas", "search"]} style={{marginLeft: 6}}/>
      <Input bordered={false} placeholder="Search..."></Input>
    </div>
    <DatePicker.RangePicker bordered={false} showTime size="small"></DatePicker.RangePicker>
  </Card>
}