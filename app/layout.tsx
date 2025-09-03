import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import GoogleAnalytics from "@/components/GoogleAnalytics"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "VitaSlim - Perca 15kg em 90 dias naturalmente",
  description:
    "Descubra o método científico que já transformou mais de 50.000 vidas usando apenas ingredientes naturais. Sem dietas malucas ou exercícios extremos.",
  keywords: "emagrecimento, perda de peso, nutracêuticos, suplementos naturais, dieta, saúde",
  authors: [{ name: "VitaSlim" }],
  creator: "VitaSlim",
  publisher: "VitaSlim",
  robots: "index, follow",
  openGraph: {
    title: "VitaSlim - Perca 15kg em 90 dias naturalmente",
    description: "Método científico comprovado para emagrecimento saudável e duradouro",
    url: "https://vitaslim.com.br",
    siteName: "VitaSlim",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VitaSlim - Transformação Natural",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VitaSlim - Perca 15kg em 90 dias naturalmente",
    description: "Método científico comprovado para emagrecimento saudável",
    images: ["/og-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#059669",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
