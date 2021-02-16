import { Tree } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setEntriesEntries, setEntriesProviderId, setProviders } from "../../state/actions";

function mapStateToProps(state){
  return { providers: state.providers }
}

function ProviderTree({ providers, dispatch }){
  useEffect(() => {
    (async () => {
      dispatch(setProviders(await fetch("http://localhost:1337/provider").then(res => res.json())))
    })()
  }, [])
  const treeData = providers.map(provider => { return { key: provider.id, title: provider.name } })
  const onChecked = async (keys) => {
    const checkedId = keys[0]
    const entries = await fetch("http://localhost:1337/provider/" + keys + "/entries").then(res => res.json())
    dispatch(setEntriesProviderId(checkedId))
    dispatch(setEntriesEntries(entries))
  }
  return (
    <Tree treeData={treeData} blockNode showLine onSelect={(keys, e) => onChecked(keys)}></Tree>
  )
}

export default connect(mapStateToProps, null)(ProviderTree)