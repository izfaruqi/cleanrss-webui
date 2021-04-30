import { Tooltip } from "antd"
import { connect } from "react-redux"
import { StatusIndicator as StatusIndicatorEnum } from "../../enums"
import { RootState } from "../../state/state"

type Props = {
  statusIndicator?: StatusIndicatorEnum
}

function mapStateToProps(state: RootState){
  return { statusIndicator: state.statusIndicator }
}

function StatusIndicator({ statusIndicator }: Props){
  return <Tooltip color={statusIndicator == StatusIndicatorEnum.CONNECTED? "green" : "red"} title={statusIndicator == StatusIndicatorEnum.CONNECTED? "Connected" : "Disconnected"}>
    <div className="electron-no-drag" style={{width: "1em", height: "1em", backgroundColor: statusIndicator == StatusIndicatorEnum.CONNECTED ? "green" : "red", borderRadius: 2, boxShadow: "0px 0px 6px 2px " + (statusIndicator == StatusIndicatorEnum.CONNECTED ? "rgba(0, 128, 0, 0.75)" : "rgba(128, 0, 0, 0.75)")}}></div>
  </Tooltip>
}

export default connect(mapStateToProps)(StatusIndicator)