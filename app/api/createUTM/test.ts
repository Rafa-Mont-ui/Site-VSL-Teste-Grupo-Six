// Arquivo de teste para demonstrar o uso da API createUTM
// Este arquivo pode ser executado com ferramentas como Postman, Insomnia ou curl

// Exemplo de teste POST para criar UTM com dados completos
const testCreateUTM = async () => {
  const utmData = {
    screen_width: 1920,
    screen_height: 1080,
    device_type: "desktop",
    browser: "Chrome",
    os: "Windows",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    specific_action: "button_click",
    referrer_url: "https://google.com",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "black_friday_2024",
    utm_term: "desconto",
    utm_content: "banner_principal"
  }

  try {
    const response = await fetch('/api/createUTM', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(utmData),
    })
    
    const result = await response.json()
    console.log('UTM criado:', result)
    return result
  } catch (error) {
    console.error('Erro ao criar UTM:', error)
  }
}

// Exemplo de teste GET para ler UTMs da query string
const testReadUTMs = async () => {
  const searchParams = 'utm_source=facebook&utm_medium=social&utm_campaign=summer_sale'
  
  try {
    const response = await fetch(`/api/createUTM?${searchParams}`)
    const result = await response.json()
    console.log('UTMs lidos:', result)
    return result
  } catch (error) {
    console.error('Erro ao ler UTMs:', error)
  }
}

// Exemplo de teste com curl (para linha de comando)
const curlExamples = {
  createUTM: `
curl -X POST http://localhost:3000/api/createUTM \\
  -H "Content-Type: application/json" \\
  -d '{
    "screen_width": 1920,
    "screen_height": 1080,
    "device_type": "desktop",
    "browser": "Chrome",
    "os": "Windows",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "specific_action": "button_click",
    "referrer_url": "https://google.com",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "black_friday_2024",
    "utm_term": "desconto",
    "utm_content": "banner_principal"
  }'
  `,
  
  readUTMs: `
curl "http://localhost:3000/api/createUTM?utm_source=facebook&utm_medium=social&utm_campaign=summer_sale"
  `
}

// Exemplo de teste com dados mínimos
const testMinimalUTM = async () => {
  const minimalData = {
    utm_source: "email"
  }

  try {
    const response = await fetch('/api/createUTM', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(minimalData),
    })
    
    const result = await response.json()
    console.log('UTM mínimo criado:', result)
    return result
  } catch (error) {
    console.error('Erro ao criar UTM mínimo:', error)
  }
}

// Exemplo de teste com dados inválidos (deve retornar erro)
const testInvalidUTM = async () => {
  const invalidData = {}

  try {
    const response = await fetch('/api/createUTM', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData),
    })
    
    const result = await response.json()
    console.log('Erro esperado:', result)
    return result
  } catch (error) {
    console.error('Erro ao testar dados inválidos:', error)
  }
}

// Exemplo de teste com método incorreto (deve retornar 405)
const testWrongMethod = async () => {
  try {
    const response = await fetch('/api/createUTM', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ utm_source: "test" }),
    })
    
    const result = await response.json()
    console.log('Erro de método incorreto:', result)
    return result
  } catch (error) {
    console.error('Erro ao testar método incorreto:', error)
  }
}

// Exporta as funções de teste para uso em outros arquivos
export {
  testCreateUTM,
  testReadUTMs,
  testMinimalUTM,
  testInvalidUTM,
  testWrongMethod,
  curlExamples
}

// Para executar os testes, descomente as linhas abaixo:
// testCreateUTM()
// testReadUTMs()
// testMinimalUTM()
// testInvalidUTM()
// testWrongMethod()
