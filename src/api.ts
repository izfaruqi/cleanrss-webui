import axios from "axios"
import state, { setProviders, setReader } from "./state/state"

const BASE_URL = process.env.NODE_ENV === "production"? "/api" : (process.env.REACT_APP_DEV_BASE_URL! + "/api")

export async function refreshProviders(){
  state.dispatch(setProviders((await axios.get(BASE_URL + "/provider")).data))
}

export async function refreshReader(entry: any) {
  state.dispatch(setReader({
    entry: entry,
    article: (await axios.get(BASE_URL + "/cleaner/entry/" + entry.id)).data
  }))
}