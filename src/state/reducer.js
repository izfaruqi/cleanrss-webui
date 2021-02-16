import produce from "immer";

const initialState = {
  providers: [],
  entries: {
    providerId: -1,
    entries: []
  },
  reader: {
    entry: {}
  }
};

function reducer(state = initialState, action) {
  switch(action.type){
    case "PROVIDERS_SET":
      return produce(state, draft => {
        draft.providers = action.payload
      })
    case "ENTRIES_PROVIDER_ID_SET":
      return produce(state, draft => {
        draft.entries.providerId = action.payload
      })
    case "ENTRIES_ENTRIES_SET": 
      return produce(state, draft => {
        draft.entries.entries = action.payload
      })
    case "READER_ENTRY_SET": 
      return produce(state, draft => {
        draft.reader.entry = action.payload
      })
    default: 
      return state;
  }
};

export default reducer;