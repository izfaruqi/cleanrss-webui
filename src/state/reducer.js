import produce from "immer";

const initialState = {
  providers: [],
  parsers: [],
  entries: {
    providerIdx: -1,
    entries: []
  },
  reader: {
    entry: {},
    providerIdx: -1
  }
};

function reducer(state = initialState, action) {
  switch(action.type){
    case "PROVIDERS_SET":
      return produce(state, draft => {
        // Update all providerIdx.
        draft.providers = action.payload
      })
    case "PARSERS_SET":
      return produce(state, draft => {
        // Update all parserIdx
        draft.parsers = action.payload
      })
    case "ENTRIES_PROVIDER_IDX_SET":
      return produce(state, draft => {
        draft.entries.providerIdx = action.payload
      })
    case "ENTRIES_ENTRIES_SET": 
      return produce(state, draft => {
        draft.entries.entries = action.payload
      })
    case "READER_ENTRY_SET": 
      return produce(state, draft => {
        draft.reader.entry = action.payload
      })
    case "READER_PROVIDER_IDX_SET": 
      return produce(state, draft => {
        draft.reader.providerIdx = action.payload
      })
    case "READER_PROVIDER_SET": 
      return produce(state, draft => {
        draft.reader.provider = action.payload
      })
    default: 
      return state;
  }
};

export default reducer;