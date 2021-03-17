import { connect } from "react-redux"
import { RootState } from "../../../../state/state"
import DOMPurify from 'dompurify'
import { useEffect, useState } from "react"
import axios, { CancelTokenSource } from "axios"
import { urlGetCleanArticle } from "../../../../api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const domPurify = DOMPurify(window)

function mapStateToProps(state: RootState){
  return { reader: state.reader }
}

function Reader({ reader }: RootState){
  const [article, setArticle] = useState("")
  const [cancelToken, setCancelToken] = useState(null as unknown as CancelTokenSource)
  const [isLoading, setIsLoading] = useState(0)
  
  useEffect(() => {
    async function fetchArticle() {
      if(reader?.entry?.id == null) return
      if(cancelToken != null) {
        cancelToken.cancel()
        setCancelToken(null as unknown as CancelTokenSource)
      }
      setIsLoading((state) => state + 1)
      try {
        const cancelToken = axios.CancelToken.source()
        setCancelToken(cancelToken)
        const rawArticle = await axios.get(urlGetCleanArticle(reader.entry.id), { cancelToken: cancelToken.token }).then(res => res.data)
        setArticle(domPurify.sanitize(rawArticle))
      } catch (e) {}
      setIsLoading((state) => state - 1)
    }
    fetchArticle()
  }, [reader?.entry])

  return <div style={{ width: '100%', height: '100%' }}>
    { isLoading? <div style={{  width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><FontAwesomeIcon size="10x" style={{ display: 'block' }} icon="spinner" spin /></div> : <div className="cleanrss-reader" dangerouslySetInnerHTML={{ __html: article }} /> }
  </div>
}

export default connect(mapStateToProps)(Reader)