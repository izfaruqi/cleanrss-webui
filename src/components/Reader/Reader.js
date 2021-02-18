import { Card, Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import DOMPurify from 'dompurify'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedo, faPlus, faCog, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faRedo, faPlus, faCog, faSearch, faSpinner)

function mapStateToProps(state){
  return { reader: state.reader, providers: state.providers }
}

const domPurify = DOMPurify(window)

function Reader({ reader, providers, dispatch }){
  const [html, setHtml] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async function () {
      // TODO: Add option to disable html sanitization.
      setIsLoading(true)
      setHtml("")
      setHtml(domPurify.sanitize(await fetch("http://localhost:1337/cleaner/" + reader.entry.id).then(res => res.text())))
      //setHtml(await fetch("http://localhost:1337/cleaner/" + reader.entry.id).then(res => res.text()))
      setIsLoading(false)
    })()
  }, [reader.entry])

  return (
    <Card bodyStyle={{display: "flex", flexDirection: "column", padding: 0, minHeight: 0, flexGrow: 1}} style={{flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0}}>
      <div style={{flexShrink: 1, borderBottom: "1px solid #303030", display: "flex"}}>
        <div style={{display: "flex", flexDirection: "column", flexGrow: 1, minWidth: 0}}>
          <div style={{display: "flex", borderBottom: "1px solid #303030"}}>
            <div style={{padding: "0px 6px 1px 6px", fontSize: "small", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", flexGrow: 1, borderRight: "1px solid #303030"}}>{reader.entry.title}</div>
            <div style={{padding: "0px 6px 1px 6px", fontSize: "small", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", borderRight: "1px solid #303030" }}>{reader.entry.author}</div>
            <div style={{padding: "0px 6px 1px 6px", fontSize: "small", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{(new Date(reader.entry.publishedAt*1000)).toLocaleString("en-GB")}</div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{padding: "0px 4px 1px 4px", borderRight: "1px solid #303030", flexShrink: 1}}>
              <FontAwesomeIcon icon={["fas", "redo"]}/>
            </div>
            <div style={{borderRight: "1px solid #303030", flexGrow: 1, padding: "0px 4px 1px 4px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>
              {reader.entry.url}
            </div>
            <div style={{padding: "0px 4px 1px 4px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>{providers[reader.providerIdx]? providers[reader.providerIdx].name : ""}</div>
          </div>
        </div>
      </div>

      <div style={{overflow: "auto", flexGrow: 1, display: 'flex', flexDirection: "column", justifyContent: "center"}}>
        <div style={{margin: "auto", display: isLoading? "":"none", fontSize: "5em"}}><FontAwesomeIcon className="fa-spin" icon={["fas", "spinner"]}></FontAwesomeIcon></div>
        <div class="cleanrss-reader" style={{height: '100%', flexGrow: 1, display: !isLoading? "":"none"}} dangerouslySetInnerHTML={{__html: html}}></div>
      </div>

    </Card>
  )
}

export default connect(mapStateToProps, null)(Reader)