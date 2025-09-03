export type CepAddress = {
  cep: string
  logradouro: string
  complemento?: string
  bairro?: string
  localidade: string
  uf: string
}

export async function fetchCep(rawCep: string): Promise<CepAddress> {
  const cep = String(rawCep || '').replace(/\D/g, '')
  if (cep.length !== 8) throw new Error('CEP inválido')

  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  if (!res.ok) throw new Error('Falha ao buscar CEP')
  const json = await res.json()
  if (json.erro) throw new Error('CEP não encontrado')

  return {
    cep: json.cep,
    logradouro: json.logradouro || '',
    complemento: json.complemento || '',
    bairro: json.bairro || '',
    localidade: json.localidade || '',
    uf: json.uf || '',
  }
}

export function formatCepInput(value: string) {
  const digits = String(value || '').replace(/\D/g, '')
  if (digits.length <= 5) return digits
  return digits.slice(0, 5) + '-' + digits.slice(5, 8)
}
