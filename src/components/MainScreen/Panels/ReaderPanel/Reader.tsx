import { connect } from "react-redux"
import { RootState } from "../../../../state/state"
import DOMPurify from 'dompurify'

function mapStateToProps(state: RootState){
  return { reader: state.reader }
}

function Reader({ reader }: RootState){
  return <div className="cleanrss-reader" dangerouslySetInnerHTML={{ __html: reader?.article? DOMPurify(window).sanitize(reader.article) : "" }} />
}

export default connect(mapStateToProps)(Reader)