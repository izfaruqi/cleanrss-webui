import { createSlice, createStore, PayloadAction } from "@reduxjs/toolkit"
import { Entry, Provider } from "../api"
import { StatusIndicator } from "../enums"

export interface NumberMap<T> { [key: number]: T; }
export interface RootState {
  providers?: Provider[],
  providersMap?: NumberMap<Provider>,
  entries?: Entry[]
  reader?: {
    entry?: Entry
  },
  statusIndicator?: StatusIndicator
}

const initialRootState = {
  providers: [],
  providersMap: {},
  entries: [],
  reader: {},
  statusIndicator: StatusIndicator.DISCONNECTED
} as RootState

const rootSlice = createSlice({
  name: 'root',
  initialState: initialRootState,
  reducers: {
    setProviders(state, action: PayloadAction<Provider[]>){
      state.providersMap = {}
      action.payload.forEach((provider: Provider) => state.providersMap![provider.id] = provider)
      state.providers = action.payload
    },
    setEntries(state, action: PayloadAction<Entry[]>){
      state.entries = action.payload
    },
    setReader(state, action: PayloadAction<object>){
      state.reader = action.payload
    },
    setStatusIndicator(state, action: PayloadAction<StatusIndicator>){
      state.statusIndicator = action.payload
    }
  }
})

export const { setProviders, setReader, setEntries, setStatusIndicator }= rootSlice.actions
export default createStore(rootSlice.reducer)