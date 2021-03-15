import axios from "axios"
import state, { setProviders } from "./state/state"

const BASE_URL = process.env.NODE_ENV === "production"? "/api" : (process.env.REACT_APP_DEV_BASE_URL! + "/api")

export async function refreshProviders(){
  state.dispatch(setProviders((await axios.get(BASE_URL + "/provider")).data))
}