"use client"

export function useSmoothScroll() {
  function scrollToElement(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return { scrollToElement }
}

export default useSmoothScroll
