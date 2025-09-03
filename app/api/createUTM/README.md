# API createUTM

Esta API permite criar e gerenciar parâmetros UTM (Urchin Tracking Module) para rastreamento de campanhas de marketing.

## Endpoints

### POST /api/createUTM
Cria um novo conjunto de parâmetros UTM.

**Corpo da requisição:**
```json
{
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "black_friday_2024",
  "utm_term": "desconto",
  "utm_content": "banner_principal"
}
```

**Resposta de sucesso (201):**
```json
{
  "success": true,
  "message": "UTM criado com sucesso",
  "data": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "black_friday_2024",
    "utm_term": "desconto",
    "utm_content": "banner_principal"
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "id": "utm_1705312200000_abc123def"
}
```

### GET /api/createUTM
Lê parâmetros UTM da query string.

**URL de exemplo:**
```
/api/createUTM?utm_source=facebook&utm_medium=social&utm_campaign=summer_sale
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "message": "UTMs lidos com sucesso",
  "data": {
    "utm_source": "facebook",
    "utm_medium": "social",
    "utm_campaign": "summer_sale"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Códigos de Status

- `200` - Sucesso (GET)
- `201` - Criado com sucesso (POST)
- `400` - Dados inválidos ou parâmetros ausentes
- `405` - Método não permitido
- `500` - Erro interno do servidor

## Exemplo de Uso no Frontend

```typescript
// Criar UTM
const createUTM = async (utmData: UTM) => {
  try {
    const response = await fetch('/api/createUTM', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(utmData),
    })
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Erro ao criar UTM:', error)
  }
}

// Ler UTMs da URL
const readUTMs = async (searchParams: string) => {
  try {
    const response = await fetch(`/api/createUTM?${searchParams}`)
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Erro ao ler UTMs:', error)
  }
}
```

## Parâmetros UTM Suportados

- `utm_source` - Origem do tráfego (ex: google, facebook, email)
- `utm_medium` - Meio de marketing (ex: cpc, social, email)
- `utm_campaign` - Nome da campanha (ex: black_friday_2024)
- `utm_term` - Palavras-chave pagas (ex: desconto, oferta)
- `utm_content` - Conteúdo específico (ex: banner_principal, cta_button)

## Notas

- Todos os parâmetros são opcionais, mas pelo menos um deve ser fornecido
- A API aceita parâmetros extras além dos padrões UTM
- Cada UTM criado recebe um ID único para rastreamento
- Timestamps são incluídos automaticamente em todas as respostas
