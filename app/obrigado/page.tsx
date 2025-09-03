"use client"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface CompraInfo {
  id: string
  plano: string
  valor: string
  dataCompra: string
  parcelas: string
}

export default function ObrigadoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [compraInfo, setCompraInfo] = useState<CompraInfo | null>(null)

  useEffect(() => {
    // Gerar informações da compra
    const gerarInfoCompra = () => {
      // ID único da compra
      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substr(2, 9).toUpperCase()
      const idCompra = `VS-${timestamp}-${randomId}`
      
      // Data atual formatada
      const dataAtual = new Date()
      const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      
      // Pegar parâmetros da URL ou usar padrões
      const plano = searchParams.get("plano") || "Plano Transformação"
      const valor = searchParams.get("valor") || "R$ 197,00"
      const parcelas = searchParams.get("parcelas") || "1"
      
      const info = {
        id: idCompra,
        plano: plano,
        valor: valor,
        dataCompra: dataFormatada,
        parcelas: parcelas
      }
      
      console.log("Informações da compra geradas:", info)
      setCompraInfo(info)
    }
    
    // Executar imediatamente
    gerarInfoCompra()
  }, [searchParams])

  const handleAccessContent = () => {
    console.log("Acessando conteúdo...")
    alert("Redirecionando para o conteúdo do seu plano!")
  }

  const handleGoHome = () => {
    router.push("/")
  }

  // Se ainda não carregou, mostrar loading
  if (!compraInfo) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 md:py-32">
          <div className="container max-w-4xl mx-auto px-4 md:px-6 text-center">
            <div className="animate-pulse">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-8"></div>
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-8"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 md:py-32">
        <div className="container max-w-4xl mx-auto px-4 md:px-6 text-center">
          
          {/* Header Section */}
          <div className="mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-6xl">🎉</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Parabéns! Sua Compra Foi Confirmada
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bem-vindo ao Protocolo VitaSlim! Sua transformação começa agora.
            </p>
          </div>

          {/* Informações da Compra - SEMPRE VISÍVEL */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-emerald-100">
            <h2 className="text-2xl font-bold text-emerald-800 mb-8 flex items-center justify-center gap-3">
              <span className="text-3xl">📋</span>
              Detalhes da Compra
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
                <div className="text-2xl mb-3">🆔</div>
                <div className="text-sm text-emerald-600 mb-2">ID da Compra</div>
                <div className="font-mono font-bold text-lg text-emerald-800 break-all">
                  {compraInfo.id}
                </div>
              </div>
              
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
                <div className="text-2xl mb-3">📦</div>
                <div className="text-sm text-emerald-600 mb-2">Plano Escolhido</div>
                <div className="font-bold text-lg text-emerald-800">
                  {compraInfo.plano}
                </div>
              </div>
              
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
                <div className="text-2xl mb-3">💰</div>
                <div className="text-sm text-emerald-600 mb-2">Valor Total</div>
                <div className="font-bold text-2xl text-emerald-800">
                  {compraInfo.valor}
                </div>
                {compraInfo.parcelas !== '1' && (
                  <div className="text-sm text-emerald-600 mt-1">
                    em {compraInfo.parcelas}x sem juros
                  </div>
                )}
              </div>
              
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
                <div className="text-2xl mb-3">📅</div>
                <div className="text-sm text-emerald-600 mb-2">Data da Compra</div>
                <div className="font-bold text-lg text-emerald-800">
                  {compraInfo.dataCompra}
                </div>
              </div>
            </div>
            
            {/* Resumo em Card */}
            <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">🎯 Resumo da Sua Compra</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{compraInfo.plano}</div>
                  <div className="text-emerald-100 text-sm">Plano Selecionado</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{compraInfo.valor}</div>
                  <div className="text-emerald-100 text-sm">Valor Pago</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{compraInfo.id}</div>
                  <div className="text-emerald-100 text-sm">ID da Compra</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-emerald-100">
            
            {/* Steps Section */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8 border border-emerald-200">
              <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center justify-center gap-3">
                <span className="text-3xl">📧</span>
                O que acontece agora?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <span className="text-gray-700">Você receberá um email de confirmação em alguns minutos</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <span className="text-gray-700">Acesso imediato ao conteúdo digital do seu plano</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <span className="text-gray-700">Convite para o grupo VIP no Telegram</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <span className="text-gray-700">Primeira consultoria de boas-vindas em 24h</span>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-emerald-100 border border-emerald-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-2xl">✨</span>
                <h3 className="text-lg font-semibold text-emerald-800">
                  Sua jornada de transformação está apenas começando!
                </h3>
              </div>
              <p className="text-emerald-700 text-center">
                Prepare-se para resultados incríveis com o Protocolo VitaSlim
              </p>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="space-y-4 max-w-md mx-auto">
            <button 
              onClick={handleAccessContent}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl transform-gpu shadow-lg"
            >
              📱 Acessar Meu Conteúdo
            </button>
            
            <button 
              onClick={handleGoHome}
              className="w-full bg-transparent border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg transform-gpu"
            >
              🏠 Voltar ao Início
            </button>
          </div>
          
          {/* Debug Info - Remover em produção */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left text-sm text-gray-600">
            <div className="font-bold mb-2">Debug Info:</div>
            <div>ID: {compraInfo.id}</div>
            <div>Plano: {compraInfo.plano}</div>
            <div>Valor: {compraInfo.valor}</div>
            <div>Data: {compraInfo.dataCompra}</div>
            <div>Parcelas: {compraInfo.parcelas}</div>
          </div>
          
        </div>
      </main>
      <Footer />
    </>
  )
}
