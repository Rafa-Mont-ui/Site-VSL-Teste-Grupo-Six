"use client"

import { useEffect, useRef, useState } from "react"

type AnimOptions = {
  delay?: number
  duration?: number
}

function useAnimation(initialTransform: string, opts: AnimOptions = {}) {
  const { delay = 0, duration = 500 } = opts
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = elementRef.current
    if (!el || typeof IntersectionObserver === "undefined") return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const animationStyles: Record<string, any> = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : initialTransform,
    transition: `opacity ${duration}ms cubic-bezier(.2,.8,.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
    willChange: "opacity, transform",
  }

  return { elementRef, animationStyles }
}

export function useFadeIn(opts?: AnimOptions) {
  return useAnimation("translateY(6px)", opts)
}

export function useFadeInUp(opts?: AnimOptions) {
  return useAnimation("translateY(20px)", opts)
}

export function useFadeInLeft(opts?: AnimOptions) {
  return useAnimation("translateX(-20px)", opts)
}

export function useFadeInRight(opts?: AnimOptions) {
  return useAnimation("translateX(20px)", opts)
}

export function useScaleIn(opts?: AnimOptions) {
  return useAnimation("scale(0.96)", opts)
}

export default useAnimation
