import { NextRequest, NextResponse } from 'next/server'
import { UTM } from '@/lib/utm'
import { insertUTMParams, UTMInsertData } from '@/lib/utm-database'

export async function POST(req: NextRequest) {
  try {
    // Verifica se é uma requisição POST
    if (req.method !== 'POST') {
      return NextResponse.json(
        { error: 'Método não permitido' },
        { status: 405 }
      )
    }

    // Obtém o corpo da requisição
    const body = await req.json()
    
    // Valida os dados de entrada
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    // Extrai os parâmetros UTM
    const {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      ...extraParams
    } = body

    // Cria o objeto UTM
    const utmData: UTM = {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      ...extraParams
    }

    // Valida se pelo menos um parâmetro UTM foi fornecido
    const hasUTMParams = Object.values(utmData).some(value => value && value.trim() !== '')
    
    if (!hasUTMParams) {
      return NextResponse.json(
        { error: 'Pelo menos um parâmetro UTM deve ser fornecido' },
        { status: 400 }
      )
    }

    // Tenta salvar no banco de dados
    let dbResult
    try {
      dbResult = await insertUTMParams({
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        ...extraParams
      })
    } catch (dbError) {
      console.warn('Banco de dados não disponível, retornando dados sem persistência:', dbError)
      dbResult = { success: false, error: 'Banco não disponível' }
    }

    // Se conseguiu salvar no banco
    if (dbResult.success) {
      const response = {
        success: true,
        message: 'UTM criado e salvo com sucesso',
        data: utmData,
        timestamp: new Date().toISOString(),
        database_id: dbResult.id,
        persisted: true
      }
      return NextResponse.json(response, { status: 201 })
    }

    // Fallback: retorna dados sem persistência
    const response = {
      success: true,
      message: 'UTM criado com sucesso (sem persistência no banco)',
      data: utmData,
      timestamp: new Date().toISOString(),
      database_id: null,
      persisted: false,
      warning: 'Configure o banco de dados para persistir os dados'
    }

    return NextResponse.json(response, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar UTM:', error)
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    // Obtém parâmetros da query string
    const { searchParams } = new URL(req.url)
    
    // Lê UTMs da query string (similar à função readUTMsFromQuery)
    const utmData: UTM = {}
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    
    utmKeys.forEach(key => {
      const value = searchParams.get(key)
      if (value) utmData[key] = value
    })

    // Se não houver parâmetros UTM, retorna erro
    if (Object.keys(utmData).length === 0) {
      return NextResponse.json(
        { error: 'Nenhum parâmetro UTM fornecido' },
        { status: 400 }
      )
    }

    const response = {
      success: true,
      message: 'UTMs lidos com sucesso',
      data: utmData,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Erro ao ler UTMs:', error)
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}


