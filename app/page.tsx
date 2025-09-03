"use client"

import Header from "../components/Header"
import VideoPlayer from "../components/VideoPlayer"
import ProductCard from "../components/ProductCard"
import TestimonialCard from "../components/TestimonialCard"
import Footer from "../components/Footer"
import CTAButton from "../components/CTAButton"
import { useFadeIn, useFadeInUp, useFadeInLeft, useFadeInRight, useScaleIn } from "../hooks/useScrollAnimation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const router = useRouter()

  // Hooks de animação para cada seção
  const heroAnimation = useFadeInUp({ delay: 200, duration: 1000 })
  const videoAnimation = useFadeIn({ delay: 400, duration: 800 })
  const productsTitleAnimation = useFadeInUp({ delay: 200, duration: 700 })
  const productCard1Animation = useFadeInLeft({ delay: 300, duration: 700 })
  const productCard2Animation = useScaleIn({ delay: 400, duration: 800 })
  const productCard3Animation = useFadeInRight({ delay: 500, duration: 700 })
  const testimonialsTitleAnimation = useFadeInUp({ delay: 200, duration: 700 })
  const testimonial1Animation = useFadeInLeft({ delay: 300, duration: 700 })
  const testimonial2Animation = useFadeInUp({ delay: 400, duration: 700 })
  const testimonial3Animation = useFadeInRight({ delay: 500, duration: 700 })
  const ctaAnimation = useScaleIn({ delay: 200, duration: 800 })

  // Efeito para rolagem automática baseada em parâmetros da URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const scrollTo = urlParams.get('scroll')
    
    if (scrollTo) {
      // Aguardar um pouco para as animações carregarem
      setTimeout(() => {
        const targetSection = document.getElementById(scrollTo)
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
          
          // Limpar o parâmetro da URL após a rolagem
          const newUrl = window.location.pathname
          window.history.replaceState({}, '', newUrl)
        }
      }, 1000) // Delay para permitir que as animações carreguem
    }
  }, [])

  // Handlers para navegação (navegar para páginas existentes)
  const handleVideoClick = () => {
    const videoSection = document.getElementById('video')
    if (videoSection) {
      videoSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      
      // Aguardar a rolagem terminar e então iniciar o vídeo
      setTimeout(() => {
        // Encontrar o botão de play e clicar nele para iniciar o vídeo
        const playButton = document.querySelector('button[aria-pressed="false"]') as HTMLButtonElement
        if (playButton) {
          playButton.click()
        }
      }, 1500) // Delay para permitir que a rolagem termine
    }
  }
  
  // Handlers para rolagem suave para seções
  const handleProductsClick = () => {
    const productsSection = document.getElementById('produtos')
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleTestimonialsClick = () => {
    const testimonialsSection = document.getElementById('depoimentos')
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section 
          ref={heroAnimation.elementRef}
          style={heroAnimation.animationStyles}
          className="relative py-20 md:py-32 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden"
        >
          <div className="container max-w-6xl mx-auto px-4 md:px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent leading-tight">
              Transforme Sua Vida com o{" "}
              <span className="text-gradient">Protocolo VitaSlim</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto text-pretty">
              Descubra o método revolucionário que já transformou mais de{" "}
              <span className="font-bold text-emerald-600">50.000 vidas</span> e{" "}
              <span className="font-bold text-emerald-600"></span>{" "}
              em apenas 90 dias
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleVideoClick}
                className="inline-flex justify-center items-center font-bold text-center transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 px-8 py-5 text-lg rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 focus:ring-emerald-500/50 hover:scale-105 hover:shadow-xl transform-gpu"
              >
                🎥 Assistir Vídeo Completo
              </button>
              <button
                onClick={handleProductsClick}
                className="inline-flex justify-center items-center font-bold text-center transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 px-8 py-5 text-lg rounded-2xl bg-transparent border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus:ring-emerald-500/50 hover:scale-105 hover:shadow-lg transform-gpu"
              >
                💎 Ver Produtos
              </button>
              <button
                onClick={handleTestimonialsClick}
                className="inline-flex justify-center items-center font-bold text-center transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 px-6 py-5 text-lg rounded-2xl bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-teal-500/50 hover:scale-105 hover:shadow-lg transform-gpu"
              >
                ✨ Ver Depoimentos
              </button>
            </div>
          </div>
          
          {/* Elementos decorativos animados */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-teal-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-emerald-300 rounded-full opacity-25 animate-pulse delay-2000"></div>
        </section>

        {/* Video Section */}
        <section 
          ref={videoAnimation.elementRef}
          style={videoAnimation.animationStyles}
          className="py-16 bg-white"
        >
          <div id="video" className="container max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
              🎬 Vídeo Revelador: Como Perder Peso em 90 Dias
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Assista ao vídeo completo e descubra como pessoas comuns conseguiram resultados extraordinários
            </p>
            <div className="relative">
              <VideoPlayer 
                videoId="dQw4w9WgXcQ"
                onPlayChange={() => {}}
                onMuteChange={() => {}}
              />
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="py-16 bg-white">
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <div ref={productsTitleAnimation.elementRef} style={productsTitleAnimation.animationStyles} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">💎 Planos Disponíveis</h2>
              <p className="text-lg text-muted-foreground">Escolha o que melhor se adapta às suas necessidades</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div
                ref={productCard1Animation.elementRef}
                style={productCard1Animation.animationStyles}
              >
                <ProductCard
                  title="Plano Essencial"
                  description="Um plano acessível com tudo que você precisa para iniciar a transformação: protocolo de 90 dias, receitas detox, lista de alimentos termogênicos e suporte em comunidade."
                  price="R$ 97"
                  image="/product1.jpg"
                  features={[
                    "Protocolo completo de 90 dias",
                    "Lista de alimentos termogênicos",
                    "Receitas detox exclusivas",
                    "Suporte via comunidade",
                    "Acesso ao grupo VIP no Telegram",
                  ]}
                  checkoutUrl={`/checkout`}
                  highlight={false}
                />
              </div>
              <div
                ref={productCard2Animation.elementRef}
                style={productCard2Animation.animationStyles}
              >
                <ProductCard
                  title="Plano Transformação"
                  description="Plano completo com acompanhamento nutricional e planos de exercício personalizados. Ideal para quem quer um resultado consistente com orientação especializada e suporte prioritário."
                  price="R$ 197"
                  image="/product2.jpg"
                  features={[
                    "Tudo do Plano Essencial",
                    "Acompanhamento nutricional personalizado",
                    "Planos de exercícios personalizados",
                    "Suplementação natural guiada",
                    "Mentoria em grupo semanal",
                    "Suporte prioritário",
                  ]}
                  checkoutUrl={`/checkout`}
                  highlight={true}
                />
              </div>
              <div
                ref={productCard3Animation.elementRef}
                style={productCard3Animation.animationStyles}
              >
                <ProductCard
                  title="Plano VIP"
                  description="Nossa experiência máxima: consultoria 1:1, análise corporal, cardápio individualizado e suporte VIP 24h — para quem busca resultados rápidos e atendimento premium."
                  price="R$ 397"
                  image="/product3.jpg"
                  features={[
                    "Tudo do Plano Transformação",
                    "Consultoria 1:1 personalizada",
                    "Análise corporal completa",
                    "Cardápio personalizado",
                    "Suporte prioritário 24h",
                  ]}
                  checkoutUrl={`/checkout`}
                  highlight={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section 
          id="depoimentos"
          ref={testimonialsTitleAnimation.elementRef}
          style={testimonialsTitleAnimation.animationStyles}
          className="py-16 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="container max-w-6xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
              ✨ Resultados Reais de Pessoas Reais
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Veja as transformações incríveis de quem seguiu nosso método com dedicação
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <div className="h-full" ref={testimonial1Animation.elementRef} style={testimonial1Animation.animationStyles}>
                <TestimonialCard
                  name="Maria Silva"
                  role="Perdeu 18kg em 3 meses"
                  text="Nunca pensei que conseguiria emagrecer sem passar fome. O método é incrível e os resultados apareceram já na primeira semana!"
                  img="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop&crop=face"
                  beforeAfter="18kg perdidos"
                />
              </div>
              <div className="h-full" ref={testimonial2Animation.elementRef} style={testimonial2Animation.animationStyles}>
                <TestimonialCard
                  name="João Santos"
                  role="Perdeu 22kg em 4 meses"
                  text="Estava com diabetes tipo 2 e consegui reverter completamente seguindo o protocolo. Minha vida mudou para sempre!"
                  img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop&crop=face"
                  beforeAfter="22kg perdidos"
                />
              </div>
              <div className="h-full" ref={testimonial3Animation.elementRef} style={testimonial3Animation.animationStyles}>
                <TestimonialCard
                  name="Ana Costa"
                  role="Perdeu 15kg em 2 meses"
                  text="Depois de 3 filhos, achei que nunca mais teria meu corpo de volta. Esse método me devolveu a autoestima!"
                  img="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=200&h=200&fit=crop&crop=face"
                  beforeAfter="15kg perdidos"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaAnimation.elementRef}
          style={ctaAnimation.animationStyles}
          className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600"
        >
          <div className="container max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              🚀 Comece Sua Transformação Hoje!
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Junte-se aos milhares de pessoas que já transformaram suas vidas com o Protocolo VitaSlim
            </p>
            <CTAButton 
              text="Quero Começar Agora"
              href="/checkout"
              variant="white"
              size="lg"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
