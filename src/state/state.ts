import { createSlice, createStore, PayloadAction } from "@reduxjs/toolkit"
import { Cleaner, Entry, Provider } from "../api"
import { StatusIndicator } from "../enums"

export interface NumberMap<T> { [key: number]: T; }
export interface RootState {
  providers?: Provider[],
  providersMap?: NumberMap<Provider>,
  cleaners?: Cleaner[],
  cleanersMap?: NumberMap<Cleaner>,
  entries?: Entry[]
  reader?: {
    entry?: Entry
  },
  statusIndicator?: StatusIndicator
}

const initialRootState = {
  providers: [],
  providersMap: {},
  cleaners: [],
  cleanersMap: {},
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
    setCleaners(state, action: PayloadAction<Cleaner[]>){
      state.cleanersMap = {}
      action.payload.forEach((cleaner: Cleaner) => state.cleanersMap![cleaner.id] = cleaner)
      state.cleaners = action.payload
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

export const { setProviders, setCleaners, setReader, setEntries, setStatusIndicator }= rootSlice.actions
export default createStore(rootSlice.reducer)