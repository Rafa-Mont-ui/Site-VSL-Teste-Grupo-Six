"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { fetchCep, formatCepInput } from "../../lib/cep"
import { useFadeInUp, useScaleIn } from "../../hooks/useScrollAnimation"

interface Plano {
  id: string
  title: string
  originalPrice: string
  description: string
  price: string
  parcelas: number
  features: string[]
  highlight: boolean
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Estado para plano selecionado
  const [selectedPlano, setSelectedPlano] = useState<Plano | null>(null)
  
  // Hooks de animação
  const headerAnimation = useFadeInUp({ delay: 200, duration: 1000 })
  const contentAnimation = useScaleIn({ delay: 400, duration: 800 })
  const formAnimation = useFadeInUp({ delay: 600, duration: 700 })
  const planosAnimation = useFadeInUp({ delay: 300, duration: 700 })

  // Lista de planos disponíveis
  const planos: Plano[] = [
    {
      id: "essencial",
      title: "Plano Essencial",
      originalPrice: "R$ 297",
      price: "R$ 97",
      description: "Um plano acessível com tudo que você precisa para iniciar a transformação: protocolo de 90 dias, receitas detox, lista de alimentos termogênicos e suporte em comunidade.",
      parcelas: 6,
      features: [
        "Protocolo completo de 90 dias",
        "Lista de alimentos termogênicos",
        "Receitas detox exclusivas",
        "Suporte via comunidade",
        "Acesso ao grupo VIP no Telegram",
      ],
      highlight: false,
    },
    {
      id: "transformacao",
      title: "Plano Transformação",
      originalPrice: "R$ 597",
      price: "R$ 197",
      description: "Plano completo com acompanhamento nutricional e planos de exercício personalizados. Ideal para quem quer um resultado consistente com orientação especializada e suporte prioritário.",
      parcelas: 12,
      features: [
        "Tudo do Plano Essencial",
        "Acompanhamento nutricional personalizado",
        "Planos de exercícios personalizados",
        "Suplementação natural guiada",
        "Mentoria em grupo semanal",
        "Suporte prioritário",
      ],
      highlight: true,
    },
    {
      id: "vip",
      title: "Plano VIP",
      originalPrice: "R$ 997",
      price: "R$ 397",
      description: "Nossa experiência máxima: consultoria 1:1, análise corporal, cardápio individualizado e suporte VIP 24h — para quem busca resultados rápidos e atendimento premium.",
      parcelas: 18,
      features: [
        "Tudo do Plano Transformação",
        "Consultoria 1:1 personalizada",
        "Análise corporal completa",
        "Cardápio personalizado",
        "Suporte prioritário 24h",
      ],
      highlight: false,
    },
  ]

  // Inicializar plano selecionado baseado nos parâmetros da URL
  useEffect(() => {
    const planoParam = searchParams.get("plano")
    const valorParam = searchParams.get("valor")
    const parcelasParam = searchParams.get("parcelas")
    
    if (planoParam && valorParam && parcelasParam) {
      // Tentar encontrar o plano pelos parâmetros da URL
      const planoEncontrado = planos.find(p => 
        p.title === planoParam || 
        p.price === valorParam || 
        p.parcelas.toString() === parcelasParam
      )
      
      if (planoEncontrado) {
        setSelectedPlano(planoEncontrado)
      }
    }
  }, [searchParams])

  // Função para selecionar um plano
  const handlePlanoSelect = (plano: Plano) => {
    setSelectedPlano(plano)
  }

  // Estado de pagamento e endereço
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "boleto" | "card">("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [pixKey, setPixKey] = useState("")

  const [cep, setCep] = useState("")
  const [street, setStreet] = useState("")
  const [number, setNumber] = useState("")
  const [complement, setComplement] = useState("")
  const [city, setCity] = useState("")
  const [stateUf, setStateUf] = useState("")
  const [cepLoading, setCepLoading] = useState(false)

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  // Referência para função que confirmará o pagamento quando Stripe Elements estiver disponível
  const cardSubmitRef = useRef<null | ((clientSecret: string) => Promise<void>)>(null)

  // Formatadores simples
  function formatPhone(v: string) {
    const d = v.replace(/\D/g, '')
    if (d.length <= 2) return d
    if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`
    if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`
    return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7,11)}`
  }

  function formatCardNumber(v: string) {
    const d = v.replace(/\D/g, '').slice(0,16)
    return d.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  function formatExpiry(v: string) {
    const d = v.replace(/\D/g, '').slice(0,4)
    if (d.length <= 2) return d
    return `${d.slice(0,2)}/${d.slice(2)}`
  }

  // Carregador dinâmico do Stripe Elements — configura função de envio via cardSubmitRef quando disponível
  useEffect(() => {
    let cancelled = false
    async function setupStripe() {
      const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      if (!pk) return

      try {
        const stripeJs = await import('@stripe/stripe-js')
        const reactStripe = await import('@stripe/react-stripe-js')
        const { loadStripe } = stripeJs
        const { Elements, useStripe, useElements, CardElement } = reactStripe
        const stripePromise = loadStripe(pk)

        // Definir componente CardForm que usa hooks do react-stripe-js
        function CardForm({ name }: { name: string }) {
          const stripe = useStripe()
          const elements = useElements()

          useEffect(() => {
            // Expor função de envio
            cardSubmitRef.current = async (clientSecret: string) => {
              if (!stripe || !elements) throw new Error('Stripe Elements não inicializado')
              const cardEl = elements.getElement(CardElement as any)
              if (!cardEl) throw new Error('Card Element não encontrado')

              const result = await (stripe as any).confirmCardPayment(clientSecret, {
                payment_method: {
                  card: cardEl,
                  billing_details: { name }
                }
              })
              if (result?.error) throw new Error(result.error.message || 'Erro ao confirmar pagamento')
              return result
            }

            return () => {
              cardSubmitRef.current = null
            }
          }, [stripe, elements, name])

          return (
            <div>
              <div className="p-4 border border-gray-300 rounded-2xl focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition-all duration-200">
                <CardElement options={{ hidePostalCode: true }} />
              </div>
            </div>
          )
        }

        // Renderizar Elements em container oculto via padrão portal: ainda retornamos nós React normalmente abaixo
        // Armazenar componentes na janela para que montagens subsequentes possam reutilizar (ajuda HMR em dev)
        ;(window as any).__stripe_integration = { Elements, CardForm, stripePromise }
      } catch (e) {
        // Pacotes Stripe não instalados — fallback gracioso
        console.warn('Stripe frontend packages not available or failed to load:', e)
      }
    }

    setupStripe()
    return () => { cancelled = true }
  }, [])

  // Renderização auxiliar para UI opcional do Stripe (se pacotes estiverem presentes na janela)
  function OptionalStripeUI({ name }: { name: string }) {
    const s = (window as any).__stripe_integration
    if (!s) return null
    const { Elements, CardForm, stripePromise } = s
    return (
      // @ts-ignore - componente dinâmico
      <Elements stripe={stripePromise}>
        {/* @ts-ignore */}
        <CardForm name={name} />
      </Elements>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 md:py-32">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          {/* Seção do Cabeçalho */}
          <div 
            ref={headerAnimation.elementRef}
            style={headerAnimation.animationStyles}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">🛒 Finalizar Compra</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete sua compra e comece sua transformação com o Protocolo VitaSlim
            </p>
          </div>

          {/* Seção de Seleção de Planos */}
          <div 
            ref={planosAnimation.elementRef}
            style={planosAnimation.animationStyles}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              💎 Escolha o Plano Ideal para Você
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {planos.map((plano) => (
                <div
                  key={plano.id}
                  onClick={() => handlePlanoSelect(plano)}
                  className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 hover:scale-105 transform-gpu ${
                    selectedPlano?.id === plano.id
                      ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                      : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  {plano.highlight && (
                    <div className="text-center mb-4">
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐ MAIS POPULAR
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{plano.title}</h3>
                  
                  <div className="text-center mb-4">
                    <div className="text-sm text-gray-500 line-through">{plano.originalPrice}</div>
                    <div className="text-3xl font-bold text-emerald-600">{plano.price}</div>
                    <div className="text-sm text-gray-600">{plano.parcelas}x sem juros</div>
            </div>

                  <p className="text-gray-600 text-sm mb-4 text-center">{plano.description}</p>
                  
                  <ul className="space-y-2 mb-4">
                    {plano.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-emerald-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className={`text-center py-2 px-4 rounded-lg font-semibold ${
                    selectedPlano?.id === plano.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedPlano?.id === plano.id ? '✅ Selecionado' : 'Clique para Selecionar'}
                  </div>
                </div>
              ))}
              </div>
            </div>

          {/* Conteúdo Principal */}
          <div 
            ref={contentAnimation.elementRef}
            style={contentAnimation.animationStyles}
            className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-12 border border-emerald-100"
          >
            {/* Resumo do Pedido */}
            {selectedPlano ? (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-6 md:p-8 mb-8 border border-emerald-200">
                <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center justify-center gap-3">
                  <span className="text-3xl">📋</span>
                  Resumo do Pedido
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-2xl mb-2">📦</div>
                    <div className="text-sm text-gray-600 mb-1">Plano</div>
                    <div className="font-bold text-emerald-800">{selectedPlano.title}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-2xl mb-2">💰</div>
                    <div className="text-sm text-gray-600 mb-1">Valor</div>
                    <div className="font-bold text-2xl text-emerald-600">{selectedPlano.price}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-2xl mb-2">📅</div>
                    <div className="text-sm text-gray-600 mb-1">Parcelas</div>
                    <div className="font-bold text-emerald-800">{selectedPlano.parcelas}x sem juros</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8 text-center">
                <div className="flex items-center justify-center gap-3 text-yellow-800 mb-3">
                  <span className="text-2xl">⚠️</span>
                  <span className="font-semibold text-lg">Selecione um Plano</span>
                </div>
                <p className="text-yellow-700">
                  Escolha um dos planos acima para continuar com o checkout
                </p>
              </div>
            )}

            {/* Seção do Formulário */}
            <div 
              ref={formAnimation.elementRef}
              style={formAnimation.animationStyles}
              className="space-y-6 sm:space-y-8"
            >
              {/* Informações Pessoais */}
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">👤</span>
                  Informações Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Nome Completo</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                      placeholder="Digite seu nome completo" 
                    />
              </div>
              <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                      placeholder="seu@email.com" 
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Telefone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                    placeholder="(11) 99999-9999" 
                  />
              </div>
              </div>

              {/* Método de Pagamento */}
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">💳</span>
                  Forma de Pagamento
                </h3>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                  <button 
                    onClick={() => setPaymentMethod('pix')} 
                    className={`px-4 sm:px-6 py-3 rounded-2xl border-2 font-semibold transition-all duration-200 text-sm sm:text-base ${
                      paymentMethod === 'pix' 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-lg' 
                        : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
                    }`}
                  >
                    🚀 PIX
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('boleto')} 
                    className={`px-4 sm:px-6 py-3 rounded-2xl border-2 font-semibold transition-all duration-200 text-sm sm:text-base ${
                      paymentMethod === 'boleto' 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-lg' 
                        : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
                    }`}
                  >
                    📄 Boleto
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('card')} 
                    className={`px-4 sm:px-6 py-3 rounded-2xl border-2 font-semibold transition-all duration-200 text-sm sm:text-base ${
                      paymentMethod === 'card' 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-lg' 
                        : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
                    }`}
                  >
                    💳 Cartão
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <input 
                      value={cardNumber} 
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} 
                      placeholder="Número do Cartão" 
                      className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input 
                        value={cardName} 
                        onChange={(e) => setCardName(e.target.value)} 
                        placeholder="Nome no cartão" 
                        className="px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                      />
                      <input 
                        value={cardExpiry} 
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))} 
                        placeholder="MM/AA" 
                        className="px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                      />
                    </div>
                    <input 
                      value={cardCvv} 
                      onChange={(e) => setCardCvv(e.target.value)} 
                      placeholder="CVV" 
                      className="w-full sm:w-32 px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                    />

                    {/* Optional Stripe Elements UI — only appears if frontend Stripe packages are installed and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set */}
                    <OptionalStripeUI name={cardName} />
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="space-y-4">
                    <p className="text-gray-600">Copie a chave PIX abaixo para efetuar o pagamento:</p>
                    <input 
                      value={pixKey} 
                      onChange={(e) => setPixKey(e.target.value)} 
                      placeholder="Chave PIX (e-mail ou cpf)" 
                      className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                    />
                  </div>
                )}

                {paymentMethod === 'boleto' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">📄</span>
                      <h4 className="font-semibold text-blue-800">Pagamento via Boleto</h4>
                    </div>
                    <p className="text-blue-700">Ao gerar o boleto, você poderá pagar em qualquer banco ou app de pagamento.</p>
                  </div>
                )}
              </div>

              {/* Endereço de Entrega */}
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  Endereço de Entrega
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">CEP</label>
                    <input 
                      value={cep} 
                      onChange={(e) => setCep(formatCepInput(e.target.value))} 
                      onBlur={async () => {
                    const digits = (cep || '').replace(/\D/g, '')
                    if (digits.length === 8) {
                      try {
                        setCepLoading(true)
                        const addr = await fetchCep(digits)
                        setStreet(addr.logradouro || '')
                        setCity(addr.localidade || '')
                        setStateUf(addr.uf || '')
                        if (addr.complemento) setComplement(addr.complemento)
                      } catch (e: any) {
                        setErrors((s) => [...s, e.message || 'Erro ao buscar CEP'])
                      } finally {
                        setCepLoading(false)
                      }
                    }
                      }} 
                      placeholder="CEP" 
                      className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Número</label>
                    <input 
                      value={number} 
                      onChange={(e) => setNumber(e.target.value)} 
                      placeholder="Número" 
                      className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Rua</label>
                  <input 
                    value={street} 
                    onChange={(e) => setStreet(e.target.value)} 
                    placeholder="Rua" 
                    className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Complemento</label>
                  <input 
                    value={complement} 
                    onChange={(e) => setComplement(e.target.value)} 
                    placeholder="Complemento (opcional)" 
                    className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Cidade</label>
                    <input 
                      value={city} 
                      onChange={(e) => setCity(e.target.value)} 
                      placeholder="Cidade" 
                      className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Estado</label>
                    <input 
                      value={stateUf} 
                      onChange={(e) => setStateUf(e.target.value)} 
                      placeholder="Estado" 
                      className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                    />
                </div>
                </div>
              </div>

              {/* Aviso de Demonstração */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 text-yellow-800 mb-3">
                  <span className="text-2xl">⚠️</span>
                  <span className="font-semibold text-lg">Atenção:</span>
                </div>
                <p className="text-yellow-700">
                  Esta é uma página de demonstração. Para implementar um checkout real, você precisará integrar com um gateway de pagamento como Stripe, PayPal, ou similar.
                </p>
              </div>

              {/* Mensagens de Erro */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <span className="text-xl">❌</span>
                    Erros encontrados:
                  </h4>
                  <ul className="list-disc pl-5 text-red-700 space-y-1">
                    {errors.map((e, i) => (<li key={i}>{e}</li>))}
                  </ul>
                </div>
              )}

              {/* Botão de Envio */}
              <button 
                disabled={loading || !selectedPlano} 
                onClick={async () => {
                setErrors([])
                const errs: string[] = []

                  if (!selectedPlano) errs.push('Selecione um plano antes de prosseguir.')
                if (!cep) errs.push('CEP é obrigatório.')
                if (!street) errs.push('Rua é obrigatória.')
                if (!number) errs.push('Número é obrigatório.')
                if (!city) errs.push('Cidade é obrigatória.')
                if (!stateUf) errs.push('Estado é obrigatório.')

                if (paymentMethod === 'card') {
                  if (!cardNumber || cardNumber.replace(/\s+/g, '').length < 12) errs.push('Número do cartão inválido.')
                  if (!cardName) errs.push('Nome no cartão é obrigatório.')
                  if (!cardExpiry) errs.push('Validade do cartão é obrigatória.')
                  if (!cardCvv || cardCvv.length < 3) errs.push('CVV inválido.')
                }

                if (paymentMethod === 'pix' && !pixKey) errs.push('Informe a chave PIX.')

                if (errs.length) { setErrors(errs); return }

                setLoading(true)
                try {
                  if (paymentMethod === 'card') {
                      const res = await fetch('/api/payment/intent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: selectedPlano!.price, currency: 'BRL', description: selectedPlano!.title }) })
                    const json = await res.json()
                    if (!res.ok) throw new Error(json?.error || 'Erro ao criar pagamento')

                    // Tentar confirmar via função de envio do Stripe Elements (se disponível)
                    if (cardSubmitRef.current) {
                      await cardSubmitRef.current(json.client_secret)
                    } else {
                      console.warn('Stripe Elements não disponível no frontend — fluxo de demonstração continua (mock)')
                    }
                  }

                  // Simular atraso de rede + sucesso mock para PIX/Boleto
                  await new Promise((r) => setTimeout(r, 700))
                  router.push('/obrigado')
                } catch (err: any) {
                  setErrors([err?.message || 'Erro ao processar pagamento'])
                } finally { setLoading(false) }
                }} 
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 text-xl disabled:opacity-60 hover:scale-105 hover:shadow-xl transform-gpu shadow-lg"
              >
                {loading ? '⏳ Processando...' : !selectedPlano ? '📋 Selecione um Plano Primeiro' : '🚀 Finalizar Compra'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
