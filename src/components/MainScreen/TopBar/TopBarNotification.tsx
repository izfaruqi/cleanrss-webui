import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Menu } from "antd";
import { RootState } from "../../../state/state";
import { Notification } from "../../../api" 
import { connect } from "react-redux";

type Props = {
  notifications?: Notification[]
}

function mapStateToProps(state: RootState){
  return { notifications: state.notifications }
}

function TopBarNotfication({ notifications }: Props){
  const notificationsList = (<Menu>
    {notifications?.map(notification => <Menu.Item>{notification.code + ": " + notification.payload}</Menu.Item>)}
  </Menu>)

  return <div className="electron-no-drag">
    <Dropdown
      className="electron-no-drag"
      overlay={notificationsList}
      trigger={["click"]}
      placement="bottomLeft"
      overlayStyle={{ maxHeight: 100, overflow: 'auto' }}
    >
      <FontAwesomeIcon style={{ display: 'block', cursor: 'pointer' }} icon="bell" />
    </Dropdown>
  </div>
}

export default connect(mapStateToProps)(TopBarNotfication)