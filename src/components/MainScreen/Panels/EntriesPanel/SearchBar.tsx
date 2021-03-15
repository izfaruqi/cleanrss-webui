import { DatePicker, Input } from "antd";
import VBar from "../../../utils/dividers/VBar";

export default function SearchBar(){
  return <div style={{ display: 'flex' }}>
    <Input style={{ flexGrow: 1 }} bordered={false} />
    <VBar />
    <DatePicker.RangePicker bordered={false} />
  </div>
}