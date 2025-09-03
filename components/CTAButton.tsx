"use client"

import type React from "react"

import { appendUTMsToUrl } from "@/lib/utm"

interface CTAButtonProps {
  href: string
  children?: React.ReactNode
  text?: string
  variant?: "primary" | "secondary" | "white"
  size?: "sm" | "md" | "lg"
}

export default function CTAButton({ href, children, text, variant = "primary", size = "md" }: CTAButtonProps) {
  const finalUrl = appendUTMsToUrl(href)

  const baseClasses =
    "w-full inline-flex justify-center items-center px-6 py-4 font-bold text-center transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 hover:scale-105 transform-gpu"

  const variantClasses =
    variant === "primary"
      ? "bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl focus:ring-emerald-200 shadow-lg hover:shadow-emerald-500/25"
      : variant === "white"
      ? "bg-white text-emerald-600 rounded-xl focus:ring-white/50 shadow-lg hover:shadow-lg hover:shadow-gray-300/50"
      : "bg-slate-900 hover:bg-slate-800 text-white rounded-xl focus:ring-slate-200 shadow-lg hover:shadow-slate-500/25"

  return (
    <a
      href={finalUrl}
      className={`${baseClasses} ${variantClasses}`}
      onClick={(e) => {
        // Aqui você pode adicionar tracking de eventos
        console.log("CTA clicked:", finalUrl)
      }}
    >
  {children ?? text}
    </a>
  )
}
