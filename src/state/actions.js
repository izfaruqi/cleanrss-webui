export function setProviders(payload){
  return { type: "PROVIDERS_SET", payload }
}

export function setEntriesProviderId(payload){
  return { type: "ENTRIES_PROVIDER_ID_SET", payload }
}

export function setEntriesEntries(payload){
  return { type: "ENTRIES_ENTRIES_SET", payload }
}

export function setReaderEntry(payload){
  return { type: "READER_ENTRY_SET", payload }
}