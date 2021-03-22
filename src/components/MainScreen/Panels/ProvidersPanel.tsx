import { Tree } from "antd";
import { Key } from "antd/lib/table/interface";
import { connect } from "react-redux";
import { loadEntriesFromProvider } from "../../../api";
import { RootState, setBrowserProviderId } from '../../../state/state'

interface Props {
  providers?: object[],
  dispatch?: any
}

function mapStateToProps(state: RootState){
  return { providers: state.providers }
}

export function ProvidersPanel({ providers, dispatch }: Props){
  const onSelect = (selected: Key[], e: any) => {
    dispatch(setBrowserProviderId(selected[0] as number))
  }
  return <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column'  }}>
    <div className="border-bottom" style={{ padding: '4px 10px 4px 10px' }}>Providers</div>
    <div style={{ flexGrow: 1, padding: "5px 20px 5px 0px", overflowY: "auto" }}>
      <Tree
        showIcon={false}
        showLine={false}
        treeData={providers?.map((provider: any) => { return { key: provider.id, title: provider.name} } )}
        onSelect={onSelect}
      />
    </div>
  </div>
}

export default connect(mapStateToProps)(ProvidersPanel)