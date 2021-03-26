import axios, { AxiosRequestConfig } from "axios"
import { StatusIndicator } from "./enums"
import state, { newNotification, setCleaners, setEntries, setProviders, setReader, setStatusIndicator } from "./state/state"

export type Notification = {
  code: string,
  payload: string
}

export type Provider = {
  id: number,
  name: string,
  url: string,
  parserId: number,
  is_deleted: boolean // TODO: Rename to isDeleted.
}

export type Cleaner = {
  id: number,
  name: string,
  rulesJson: string,
  is_deleted: boolean
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
      const jsonData: Notification = JSON.parse(e.data)
      state.dispatch(newNotification(jsonData))
    }
  };  
}
connectWS()

export const urlGetCleanArticle = (entryId: number) => BASE_URL + "/cleaner/entry/" + entryId

export async function refreshProviders(){
  state.dispatch(setProviders((await axios.get(BASE_URL + "/provider")).data))
}

export async function refreshCleaners(){
  state.dispatch(setCleaners((await axios.get(BASE_URL + "/cleaner")).data))
}

export async function loadEntriesFromProvider(providerId?: number){
  state.dispatch(setEntries((await axios.get(BASE_URL + "/entry/provider/" + (providerId? providerId : -1) + "?limit=60")).data))
}

export async function loadEntriesFromSearch(query: string, providerId?: number){
  state.dispatch(setEntries((await axios.get(BASE_URL + "/entry/search?q=" + encodeURIComponent(query) + (providerId? "&provider_id=" + encodeURIComponent(providerId) : ""))).data))
}

export async function loadEntryToReader(entry: Entry){
  state.dispatch(setReader({ entry: entry }))
}

export function reqModifyCleaner(cleaner: Cleaner, config?: AxiosRequestConfig){
  return axios.post(BASE_URL + "/cleaner/" + cleaner.id, cleaner, config)
}

export function reqModifyProvider(provider: Provider, config?: AxiosRequestConfig){
  return axios.post(BASE_URL + "/provider/" + provider.id, provider, config)
}

export function reqAddProvider(provider: Provider, config?: AxiosRequestConfig){
  return axios.post(BASE_URL + "/provider", provider, config)
}

export function reqDeleteProvider(providerId: number, config?: AxiosRequestConfig){
  return axios.delete(BASE_URL + "/provider/" + providerId, config)
}