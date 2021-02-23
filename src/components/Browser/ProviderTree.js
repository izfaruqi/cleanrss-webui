import { Tree } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setEntriesProviderIdx, setProviders } from "../../state/actions";
import _ from "lodash"

function mapStateToProps(state){
  return { providers: state.providers }
}

function ProviderTree({ providers, dispatch }){
  useEffect(() => {
    (async () => {
      dispatch(setProviders(await fetch("http://localhost:1337/api/provider").then(res => res.json())))
    })()
  }, [])
  const treeData = providers.map(provider => { return { key: provider.id, title: provider.name } })
  const onChecked = async (keys) => {
    const checkedId = _.findIndex(providers, provider => provider.id == keys[0])
    dispatch(setEntriesProviderIdx(checkedId))
  }
  return (
    <Tree treeData={treeData} blockNode showLine onSelect={(keys, e) => onChecked(keys)}></Tree>
  )
}

export default connect(mapStateToProps, null)(ProviderTree)