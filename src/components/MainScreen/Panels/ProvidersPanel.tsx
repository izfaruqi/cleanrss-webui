import { Tree } from "antd";
import { connect } from "react-redux";
import { RootState } from '../../../state/state'

interface Props {
  providers: object[]
}

function mapStateToProps(state: RootState){
  return { providers: state.providers }
}

export function ProvidersPanel({ providers }: Props){
  return <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column'  }}>
    <div className="border-bottom" style={{ padding: '4px 10px 4px 10px' }}>Providers</div>
    <div style={{ flexGrow: 1, padding: "5px 20px 5px 0px", overflowY: "auto" }}>
      <Tree
        showIcon={false}
        showLine={false}
        treeData={providers.map((provider: any) => { return { key: provider.id, title: provider.name} } )}
      />
    </div>
  </div>
}

export default connect(mapStateToProps)(ProvidersPanel)