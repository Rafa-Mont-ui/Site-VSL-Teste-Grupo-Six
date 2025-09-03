export interface UTM {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  [key: string]: string | undefined
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const

type UTMKey = (typeof UTM_KEYS)[number]

/** Lê UTMs da querystring */
export function readUTMsFromQuery(search: string): UTM {
  const params = new URLSearchParams(search)
  const data: UTM = {}

  UTM_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) data[key] = value
  })

  return data
}

/** Persiste UTMs no localStorage se existirem */
export function persistUTMs(utms: UTM) {
  const current = getPersistedUTMs()
  const merged = { ...current, ...utms }
  localStorage.setItem("UTM_DATA", JSON.stringify(merged))
}

/** Recupera UTMs persistidas */
export function getPersistedUTMs(): UTM {
  try {
    const raw = localStorage.getItem("UTM_DATA")
    return raw ? (JSON.parse(raw) as UTM) : {}
  } catch {
    return {}
  }
}

/** Adiciona UTMs a uma URL mantendo parâmetros existentes */
export function appendUTMsToUrl(url: string, extra?: Record<string, string>): string {
  const u = new URL(url, window.location.origin)
  const stored = getPersistedUTMs()
  const params = new URLSearchParams(u.search)

  // Adiciona UTMs armazenadas
  Object.entries(stored).forEach(([key, value]) => {
    if (value) params.set(key, value)
  })

  // Adiciona parâmetros extras se fornecidos
  if (extra) {
    Object.entries(extra).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
  }

  u.search = params.toString()
  return u.toString()
}

/** Captura da URL atual e persiste */
export function captureAndPersistUTMs(search: string) {
  const utms = readUTMsFromQuery(search)
  if (Object.keys(utms).length > 0) {
    persistUTMs(utms)
  }
}
