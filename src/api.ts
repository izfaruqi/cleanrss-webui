import axios from "axios"
import { StatusIndicator } from "./enums"
import state, { setEntries, setProviders, setReader, setStatusIndicator } from "./state/state"

const BASE_HOST = process.env.NODE_ENV === "production"? "" : (process.env.REACT_APP_DEV_BASE_HOST!)
const BASE_URL = "http://" + BASE_HOST + "/api"
const WS_URL = "ws://" + BASE_HOST + "/api/ws"

function connectWS(){
  let wsClient: WebSocket | null = new WebSocket(WS_URL)

  wsClient.onerror = function() {
    console.log('Connection Error');
  };

  wsClient.onopen = function() {
    console.log('WebSocket wsClient Connected');
    state.dispatch(setStatusIndicator(StatusIndicator.CONNECTED))
  };

  wsClient.onclose = function() {
    console.log('echo-protocol wsClient Closed');
    state.dispatch(setStatusIndicator(StatusIndicator.DISCONNECTED))
    wsClient?.close()
    if(wsClient == null) return
    wsClient = null
    setTimeout(connectWS, 5000)
  };

  wsClient.onmessage = function(e) {
    if (typeof e.data === 'string') {
      console.log("Received: '" + e.data + "'");
    }
  };  
}
connectWS()

export const urlGetCleanArticle = (entryId: number) => BASE_URL + "/cleaner/entry/" + entryId

export type Provider = {
  id: number,
  name: string,
  url: string,
  parserId: number,
  is_deleted: boolean // TODO: Rename to isDeleted.
}

export type Entry = {
  id: number,
  providerId: number,
  url: string
  title: string
  publishedAt: number
  author?: string
  fetchedAt: string
  json?: string
}

export async function refreshProviders(){
  state.dispatch(setProviders((await axios.get(BASE_URL + "/provider")).data))
}

export async function loadEntriesFromProvider(providerId?: number){
  state.dispatch(setEntries((await axios.get(BASE_URL + "/entry/provider/" + (providerId? providerId : -1) + "?limit=60")).data))
}

export async function loadEntryToReader(entry: Entry){
  state.dispatch(setReader({ entry: entry }))
}