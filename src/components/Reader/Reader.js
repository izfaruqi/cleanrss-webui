import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

function mapStateToProps(state){
  return { reader: state.reader }
}

function Reader({ reader, dispatch }){
  const [html, setHtml] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    (async function () {
      setUrl(reader.entry.url)
      setHtml(await fetch("http://localhost:1337/cleaner/" + reader.entry.id).then(res => res.text()))
    })()
  }, [reader.entry])
  
  return (
    <Card bodyStyle={{overflow: "auto"}} headStyle={{paddingBottom: 8}} style={{height: "100%", display: "flex", flexDirection: "column"}} size="small" title={<Input disabled addonBefore="R" value={url}></Input>}>
      <div style={{height: '100%'}} dangerouslySetInnerHTML={{__html: html}}></div>
    </Card>
  )
}

export default connect(mapStateToProps, null)(Reader)