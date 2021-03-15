import { createSlice, createStore, PayloadAction } from "@reduxjs/toolkit"

interface RootState {
  providers: object[]
}

const initialRootState = {
  providers: []
} as RootState

const rootSlice = createSlice({
  name: 'root',
  initialState: initialRootState,
  reducers: {
    setProviders(state, action: PayloadAction<object[]>){
      state.providers = action.payload
    }
  }
})

export const { setProviders }= rootSlice.actions
export default createStore(rootSlice.reducer)