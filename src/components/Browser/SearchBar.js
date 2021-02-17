import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, DatePicker, Input } from "antd";

export default function SearchBar(){
  return <Card size="small" bodyStyle={{padding: 0, display: 'flex', alignItems: "center"}}>
    <FontAwesomeIcon icon={["fas", "search"]} style={{marginLeft: 6}}/>
    <Input style={{borderRight: "1px solid #303030"}} bordered={false} placeholder="Search..."></Input>
    <DatePicker.RangePicker bordered={false}></DatePicker.RangePicker>
  </Card>
}