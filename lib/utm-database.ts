import sql from './database'

export interface UTMInsertData {
  screen_width?: number
  screen_height?: number
  device_type?: string
  browser?: string
  os?: string
  user_agent?: string
  specific_action?: string
  referrer_url?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export async function insertUTMParams(data: UTMInsertData): Promise<{ success: boolean; id?: number; error?: string }> {
  try {

    const result = await sql`
      INSERT INTO utmparams (
        screen_width,
        screen_height,
        device_type,
        browser,
        os,
        user_agent,
        specific_action,
        referrer_url,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content
      ) VALUES (
        ${data.screen_width || null},
        ${data.screen_height || null},
        ${data.device_type || null},
        ${data.browser || null},
        ${data.os || null},
        ${data.user_agent || null},
        ${data.specific_action || null},
        ${data.referrer_url || null},
        ${data.utm_source || null},
        ${data.utm_medium || null},
        ${data.utm_campaign || null},
        ${data.utm_term || null},
        ${data.utm_content || null}
      )
      RETURNING id
    `
    
    return {
      success: true,
      id: result[0].id
    }
    
  } catch (error) {
    console.error('Erro ao inserir UTM params:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}

// Função para buscar dados UTM por ID
export async function getUTMParamsById(id: number): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const result = await sql`
      SELECT * FROM utmparams WHERE id = ${id}
    `
    
    if (result.length === 0) {
      return {
        success: false,
        error: 'UTM params não encontrado'
      }
    }
    
    return {
      success: true,
      data: result[0]
    }
    
  } catch (error) {
    console.error('Erro ao buscar UTM params:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}

export async function getUTMParamsByUTM(utmData: Partial<UTMInsertData>): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    let conditions: any[] = []
    let values: any[] = []
    
    if (utmData.utm_source) {
      conditions.push(sql`utm_source = ${utmData.utm_source}`)
    }
    
    if (utmData.utm_medium) {
      conditions.push(sql`utm_medium = ${utmData.utm_medium}`)
    }
    
    if (utmData.utm_campaign) {
      conditions.push(sql`utm_campaign = ${utmData.utm_campaign}`)
    }
    
    if (utmData.utm_term) {
      conditions.push(sql`utm_term = ${utmData.utm_term}`)
    }
    
    if (utmData.utm_content) {
      conditions.push(sql`utm_content = ${utmData.utm_content}`)
    }
    
    // Se não houver condições, retorna erro
    if (conditions.length === 0) {
      return {
        success: false,
        error: 'Nenhum parâmetro UTM fornecido para busca'
      }
    }
    
    const whereClause = conditions.reduce((acc, condition) => 
      acc ? sql`${acc} AND ${condition}` : condition
    )
    
    const result = await sql`
      SELECT * FROM utmparams 
      WHERE ${whereClause}
      ORDER BY action_timestamp DESC
    `
    
    return {
      success: true,
      data: result
    }
    
  } catch (error) {
    console.error('Erro ao buscar UTM params:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}

export async function getUTMStats(): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const result = await sql`
      SELECT 
        COUNT(*) as total_records,
        COUNT(DISTINCT utm_source) as unique_sources,
        COUNT(DISTINCT utm_campaign) as unique_campaigns,
        COUNT(DISTINCT device_type) as unique_devices,
        COUNT(DISTINCT browser) as unique_browsers,
        AVG(screen_width) as avg_screen_width,
        AVG(screen_height) as avg_screen_height
      FROM utmparams
    `
    
    return {
      success: true,
      data: result[0]
    }
    
  } catch (error) {
    console.error('Erro ao buscar estatísticas UTM:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}
