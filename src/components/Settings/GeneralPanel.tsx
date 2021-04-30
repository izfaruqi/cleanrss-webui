import { Form, Switch } from "antd";
import { connect } from "react-redux";
import { RootState, setIFrameMode } from "../../state/state";

type Props = {
  iframeMode?: boolean,
  dispatch: any
}

function mapStateToProps(state: RootState){
  return { iframeMode: state.settings?.iframeMode }
}

function GeneralPanel({ iframeMode, dispatch }: Props){
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', paddingTop: 5 }}>
    <Form labelCol={{ span: 5 }}>
      <Form.Item label="IFrame mode">
        <Switch checked={iframeMode} onChange={(c: boolean, e: any) => dispatch(setIFrameMode(c))}></Switch>
      </Form.Item>
    </Form>
  </div>
}

export default connect(mapStateToProps)(GeneralPanel)