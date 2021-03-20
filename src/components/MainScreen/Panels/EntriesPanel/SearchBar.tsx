import { DatePicker, Input } from "antd";
import VBar from "../../../utils/dividers/VBar";

export default function SearchBar(){
  return <div style={{ display: 'flex' }}>
    <Input style={{ flexGrow: 1 }} bordered={false} placeholder="Search..." />
    <VBar />
    <DatePicker.RangePicker style={{ flexGrow: 1 }} showTime showSecond={false} format="YYYY-MM-DD HH:mm" bordered={false} />
  </div>
}