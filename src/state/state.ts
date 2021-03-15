import { createSlice, createStore, PayloadAction } from "@reduxjs/toolkit"

export interface RootState {
  providers?: object[],
  reader?: {
    entry?: object,
    article?: string
  }
}

const initialRootState = {
  providers: [],
  reader: {}
} as RootState

const rootSlice = createSlice({
  name: 'root',
  initialState: initialRootState,
  reducers: {
    setProviders(state, action: PayloadAction<object[]>){
      state.providers = action.payload
    },
    setReader(state, action: PayloadAction<object>){
      state.reader = action.payload
    }
  }
})

export const { setProviders, setReader }= rootSlice.actions
export default createStore(rootSlice.reducer)