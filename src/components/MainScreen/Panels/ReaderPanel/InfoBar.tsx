import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import { format } from "date-fns";
import { connect } from "react-redux";
import { Entry, Provider } from "../../../../api";
import { NumberMap, RootState } from "../../../../state/state";
import VBar from "../../../utils/dividers/VBar";

type Props = {
  providersMap?: NumberMap<Provider>,
  readerEntry?: Entry
}

function mapStateToProps(state: RootState){
  return { readerEntry: state?.reader?.entry, providersMap: state.providersMap }
}

const textFieldStyle: React.CSSProperties = { margin: 'auto 7px auto 7px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }

function InfoBar({ readerEntry, providersMap }: Props){
  const isReaderEmpty = () => {
    if(readerEntry == null){
      return {
        iconStyle: { cursor: 'not-allowed', opacity: 0.6 } as React.CSSProperties,
        iconHref: undefined
      }
    } else {
      return {
        iconStyle: { cursor: 'pointer' } as React.CSSProperties,
        iconHref: readerEntry.url
      }
    }
  }

  const publishedAtString = readerEntry? format(readerEntry?.publishedAt * 1000, "yyyy-MM-dd HH:mm") : ""
  const providerName = providersMap && readerEntry? providersMap[readerEntry?.providerId].name : ""

  return <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', height: 28 }}>
      <div style={{ flexGrow: 0, ...textFieldStyle }}>
        <a style={isReaderEmpty().iconHref? {} : { color: 'inherit', textDecoration: 'none' }} href={isReaderEmpty().iconHref} target="_blank">
          <FontAwesomeIcon style={{ display: 'block', ...isReaderEmpty().iconStyle }} icon="external-link-alt" />
        </a>
      </div>
      <VBar />
      <div style={{ flexGrow: 2, ...textFieldStyle }}><Tooltip placement="bottomLeft" title={readerEntry?.title}>{ readerEntry?.title }</Tooltip></div>
      <VBar />
      <div style={{ flexGrow: 0, ...textFieldStyle }}><Tooltip placement="bottomLeft" title={readerEntry?.author}>{ readerEntry?.author }</Tooltip></div>
      <VBar />
      <div style={{ flexGrow: 0, ...textFieldStyle }}><Tooltip placement="bottomLeft" title={publishedAtString}>{ publishedAtString }</Tooltip></div>
      <VBar />
      <div style={{ flexGrow: 0, ...textFieldStyle }}><Tooltip placement="bottomLeft" title={providerName}>{ providerName }</Tooltip></div>
    </div>
  </div>
}

export default connect(mapStateToProps)(InfoBar)