import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import DOMPurify from 'dompurify'

function mapStateToProps(state){
  return { reader: state.reader }
}

const domPurify = DOMPurify(window)

function Reader({ reader, dispatch }){
  const [html, setHtml] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    (async function () {
      setUrl(reader.entry.url)
      // TODO: Add option to disable html sanitization.
      setHtml(domPurify.sanitize(await fetch("http://localhost:1337/cleaner/" + reader.entry.id).then(res => res.text())))
    })()
  }, [reader.entry])
  
  return (
    <Card bodyStyle={{overflow: "auto"}} headStyle={{marginTop: 2.5, paddingBottom: 30, display: 'flex', flexDirection: 'column'}} style={{height: "100%", display: "flex", flexDirection: "column"}} size="small" title={<Input style={{marginBottom: 5}} disabled addonBefore="R" value={url}></Input>}>
      <div class="cleanrss-reader" style={{height: '100%'}} dangerouslySetInnerHTML={{__html: html}}></div>
    </Card>
  )
}

export default connect(mapStateToProps, null)(Reader)