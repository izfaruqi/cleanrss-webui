import { Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StatusIndicator(){
  const [status, setStatus] = useState(1)
  const doPing = async () => {
    const ping = await axios.get('http://localhost:1337/api/ping', { timeout: 2500 }).catch(() => {})
    if(ping == null){
      setStatus(1)
      return
    }
    if(ping.status == 204){
      setStatus(0)
    } else {
      setStatus(1)
    }
  }
  useEffect(() => {
    doPing()
    setInterval(async () => {
      await doPing()
    }, 5000)
  }, [])
  return (
    <Tooltip title={status == 0? "Connected" : "Not connected"} color={status == 0? "green" : "red"}>
      <div style={{width: "1em", height: "1em", backgroundColor: status == 0? "green" : "red", borderRadius: 2, boxShadow: "0px 0px 6px 2px " + (status == 0? "rgba(0, 128, 0, 0.75)" : "rgba(128, 0, 0, 0.75)")}}></div>
    </Tooltip>
  )
}