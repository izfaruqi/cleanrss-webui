import { connect } from "react-redux"
import { RootState } from "../../../../state/state"
import DOMPurify from 'dompurify'
import { useEffect, useState } from "react"
import axios, { CancelTokenSource } from "axios"
import { urlGetCleanArticle } from "../../../../api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const domPurify = DOMPurify(window)

function mapStateToProps(state: RootState){
  return { reader: state.reader, settings: state.settings }
}

function Reader({ reader, settings }: RootState){
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
    if(!settings?.iframeMode) fetchArticle()
  }, [reader?.entry, settings?.iframeMode])

  const readerElement = (iframeMode?: boolean) => {
    if(!iframeMode){
      return isLoading? <div style={{  width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><FontAwesomeIcon size="10x" style={{ display: 'block' }} icon="spinner" spin /></div> : <div className="cleanrss-reader" dangerouslySetInnerHTML={{ __html: article }} />
    } else {
      return <div style={{ width: "100%", height: "100%", display: "flex" }}><iframe style={{ flexGrow: 1, alignContent: "stretch" }} src={reader?.entry?.url}></iframe></div>
    }
  }

  return <div style={{ width: '100%', height: '100%' }}>
    { readerElement(settings?.iframeMode) }
  </div>
}

export default connect(mapStateToProps)(Reader)