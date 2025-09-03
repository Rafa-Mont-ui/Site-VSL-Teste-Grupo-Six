"use client"

import { useEffect, useState } from "react"
import { getPersistedUTMs, type UTM } from "@/lib/utm"

export function useUTM(): UTM {
  const [utms, setUTMs] = useState<UTM>({})

  useEffect(() => {
    setUTMs(getPersistedUTMs())
  }, [])

  return utms
}
