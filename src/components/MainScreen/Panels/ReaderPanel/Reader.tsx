import { connect } from "react-redux"
import { RootState } from "../../../../state/state"
import DOMPurify from 'dompurify'
import { useEffect, useState } from "react"
import axios from "axios"
import { urlGetCleanArticle } from "../../../../api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const domPurify = DOMPurify(window)

function mapStateToProps(state: RootState){
  return { reader: state.reader }
}

function Reader({ reader }: RootState){
  const [article, setArticle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    async function fetchArticle() {
      if(reader?.entry?.id == null) return
      setIsLoading(true)
      try {
        const rawArticle = await axios.get(urlGetCleanArticle(reader.entry.id)).then(res => res.data)
        setArticle(domPurify.sanitize(rawArticle))
      } catch (e) {}
      setIsLoading(false)
    }
    fetchArticle()
  }, [reader?.entry])

  return <div style={{ width: '100%', height: '100%' }}>
    { isLoading? <div style={{  width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><FontAwesomeIcon size="10x" style={{ display: 'block' }} icon="spinner" spin /></div> : <div className="cleanrss-reader" dangerouslySetInnerHTML={{ __html: article }} /> }
  </div>
}

export default connect(mapStateToProps)(Reader)