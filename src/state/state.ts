import { createSlice, createStore, PayloadAction } from "@reduxjs/toolkit"
import { Cleaner, Entry, Provider } from "../api"
import { StatusIndicator } from "../enums"
import { Notification } from '../api'

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
  browser?: {
    providerId?: number
  }
  statusIndicator?: StatusIndicator,
  notifications?: Notification[]
}

const initialRootState = {
  providers: [],
  providersMap: {},
  cleaners: [],
  cleanersMap: {},
  entries: [],
  reader: {},
  browser: {},
  statusIndicator: StatusIndicator.DISCONNECTED,
  notifications: []
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
    setBrowserProviderId(state, action: PayloadAction<number>){
      state.browser!.providerId = action.payload
    },
    setStatusIndicator(state, action: PayloadAction<StatusIndicator>){
      state.statusIndicator = action.payload
    },
    newNotification(state, action: PayloadAction<Notification>){
      state.notifications?.unshift(action.payload)
    }
  }
})

export const { setProviders, setCleaners, setReader, setEntries, setBrowserProviderId, setStatusIndicator, newNotification }= rootSlice.actions
export default createStore(rootSlice.reducer)