import { Card } from "antd"
import { connect } from "react-redux"
import { RootState } from "../../../../state/state"

function mapStateToProps(state: RootState){
  return { entries: state.entries }
}

function EntriesList({ entries }: RootState){
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 5, padding: 7 }}>
    {entries?.map(entry => <Card>{entry.title}</Card>)}
  </div>
}

export default connect(mapStateToProps)(EntriesList)