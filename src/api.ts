import axios from "axios"
import state, { setEntries, setProviders, setReader } from "./state/state"

const BASE_URL = process.env.NODE_ENV === "production"? "/api" : (process.env.REACT_APP_DEV_BASE_URL! + "/api")

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
  publishedAt: string
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

export async function refreshReader(entry: any) {
  state.dispatch(setReader({
    entry: entry,
    article: (await axios.get(BASE_URL + "/cleaner/entry/" + entry.id)).data
  }))
}