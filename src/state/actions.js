export function setProviders(payload){
  return { type: "PROVIDERS_SET", payload }
}

export function setParsers(payload){
  return { type: "PARSERS_SET", payload }
}

export function setEntriesProviderIdx(payload){
  return { type: "ENTRIES_PROVIDER_IDX_SET", payload }
}

export function setEntriesEntries(payload){
  return { type: "ENTRIES_ENTRIES_SET", payload }
}

export function setReaderEntry(payload){
  return { type: "READER_ENTRY_SET", payload }
}

export function setReaderProviderIdx(payload){
  return { type: "READER_PROVIDER_IDX_SET", payload }
}

export function setReaderProvider(payload){
  return { type: "READER_PROVIDER_SET", payload }
}