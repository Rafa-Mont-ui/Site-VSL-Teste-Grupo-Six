"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ProductCard from "../../components/ProductCard"
import { Check, Star, Shield, Lock, ArrowRight, Clock, Users } from "lucide-react"
import { useFadeInUp, useFadeInLeft, useFadeInRight, useScaleIn } from "@/hooks/useScrollAnimation"

interface Plano {
  id: string
  title: string
  originalPrice: string
  description?: string
  price: string
  parcelas: number
  bullets: string[]
  highlight: boolean
  popular?: boolean
  garantia: number
  suporte: string
}

export default function PlanosPage() {
  const router = useRouter()
  const [selectedPlano, setSelectedPlano] = useState<string | null>(null)

  const headerAnimation = useFadeInUp({ delay: 200, duration: 1000 })
  const planosTitleAnimation = useFadeInUp({ delay: 300, duration: 800 })
  const plano1Animation = useFadeInLeft({ delay: 400, duration: 700 })
  const plano2Animation = useScaleIn({ delay: 500, duration: 800 })
  const plano3Animation = useFadeInRight({ delay: 600, duration: 700 })
  // garantia section removed per request
  const ctaAnimation = useScaleIn({ delay: 200, duration: 800 })

  const planos: Plano[] = [
    {
      id: "essencial",
      title: "Plano Essencial",
      originalPrice: "R$ 297",
      price: "R$ 97",
      description:
        "Um plano acessível com tudo que você precisa para iniciar a transformação: protocolo de 90 dias, receitas detox, lista de alimentos termogênicos e suporte em comunidade.",
      parcelas: 6,
      bullets: [
        "Protocolo completo de 90 dias",
        "Lista de alimentos termogênicos",
        "Receitas detox exclusivas",
        "Suporte via comunidade",
        "Acesso ao grupo VIP no Telegram",
      ],
      highlight: false,
      garantia: 30,
      suporte: "Comunidade",
    },
    {
      id: "transformacao",
      title: "Plano Transformação",
      originalPrice: "R$ 597",
      price: "R$ 197",
      description:
        "Plano completo com acompanhamento nutricional e planos de exercício personalizados. Ideal para quem quer um resultado consistente com orientação especializada e suporte prioritário.",
      parcelas: 12,
      bullets: [
        "Tudo do Plano Essencial",
        "Acompanhamento nutricional personalizado",
        "Planos de exercícios personalizados",
        "Suplementação natural guiada",
        "Mentoria em grupo semanal",
        "Suporte prioritário",
      ],
      highlight: true,
      popular: true,
      garantia: 60,
      suporte: "Prioritário",
    },
    {
      id: "vip",
      title: "Plano VIP",
      originalPrice: "R$ 997",
      price: "R$ 397",
      description:
        "Nossa experiência máxima: consultoria 1:1, análise corporal, cardápio individualizado e suporte VIP 24h — para quem busca resultados rápidos e atendimento premium.",
      parcelas: 18,
      bullets: [
        "Tudo do Plano Transformação",
        "Consultoria 1:1 personalizada",
        "Análise corporal completa",
        "Cardápio personalizado",
        "Suporte prioritário 24h",
      ],
      highlight: false,
      garantia: 90,
      suporte: "VIP 24h",
    },
  ]

  const handlePlanoSelect = (planoId: string) => {
    setSelectedPlano(planoId)
    const plano = planos.find((p) => p.id === planoId)
    if (plano) {
      router.push(
        `/checkout?plano=${encodeURIComponent(plano.title)}&valor=${encodeURIComponent(plano.price)}&parcelas=${plano.parcelas}`
      )
    }
  }

  return (
    <>
      <Header />
      <main>
        <section
          ref={headerAnimation.elementRef}
          style={headerAnimation.animationStyles}
          className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50"
        >
          <div className="container max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">🎯 Escolha o Plano Perfeito para Você</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada plano foi desenvolvido para maximizar seus resultados e transformar sua vida
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <div ref={planosTitleAnimation.elementRef} style={planosTitleAnimation.animationStyles} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">💎 Planos Disponíveis</h2>
              <p className="text-lg text-muted-foreground">Escolha o que melhor se adapta às suas necessidades</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {planos.map((p, i) => (
                <div
                  key={p.id}
                  ref={(i === 0 ? plano1Animation : i === 1 ? plano2Animation : plano3Animation).elementRef}
                  style={(i === 0 ? plano1Animation : i === 1 ? plano2Animation : plano3Animation).animationStyles}
                >
                  <ProductCard
                    title={p.title}
                    description={p.description}
                    price={p.price}
                    image={`/product${i + 1}.jpg`}
                    features={p.bullets}
                    checkoutUrl={`/checkout?plano=${encodeURIComponent(p.title)}&valor=${encodeURIComponent(p.price)}&parcelas=${p.parcelas}`}
                    highlight={p.highlight}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

  {/* Garantias section removed */}

        <section ref={ctaAnimation.elementRef} style={ctaAnimation.animationStyles} className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="container max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">🚀 Comece Sua Transformação Hoje!</h2>
            <p className="text-xl text-emerald-100 mb-8">Escolha o plano ideal e comece sua jornada para uma vida mais saudável</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                onClick={() => router.push("/?scroll=produtos")} 
                className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg hover:scale-105 hover:shadow-lg transform-gpu"
              >
                💎 Ver Produtos
              </button>
              <button 
                onClick={() => router.push("/?scroll=depoimentos")} 
                className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg hover:scale-105 hover:shadow-lg transform-gpu"
              >
                ✨ Ver Depoimentos
              </button>
            </div>
            
            <button 
              onClick={() => router.push("/")} 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg hover:scale-105 hover:shadow-lg transform-gpu"
            >
              🏠 Voltar para o Início
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
