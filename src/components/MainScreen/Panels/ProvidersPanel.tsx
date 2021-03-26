import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tree } from "antd";
import { Key } from "antd/lib/table/interface";
import { useState } from "react";
import { connect } from "react-redux";
import { reqRefreshAllProviders } from "../../../api";
import { RootState, setBrowserProviderId } from '../../../state/state'
import HBar from "../../utils/dividers/HBar";

interface Props {
  providers?: object[],
  dispatch?: any
}

function mapStateToProps(state: RootState){
  return { providers: state.providers }
}

export function ProvidersPanel({ providers, dispatch }: Props){
  const [isRefreshing, setIsRefreshing] = useState(false)
  const onSelect = (selected: Key[], e: any) => {
    dispatch(setBrowserProviderId(selected[0] as number))
  }

  const onSyncAll = async () => {
    if(isRefreshing) return
    setIsRefreshing(true)
    await reqRefreshAllProviders()
    setTimeout(() => setIsRefreshing(false), 5000) // TODO: Add finish refresh notification.
  }

  return <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column'  }}>
    <div style={{ display: 'flex', padding: '4px 10px 4px 10px' }}>
      <div>Providers</div>
      <div style={{ flexGrow: 1 }}/>
      <div><FontAwesomeIcon spin={isRefreshing} onClick={onSyncAll} style={{ cursor: 'pointer' }} icon="sync" /></div>
    </div>
    <HBar />
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