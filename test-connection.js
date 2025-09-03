// Teste simples de conexão com o banco
// Execute com: node test-connection.js

import postgres from 'postgres'
import dotenv from 'dotenv'

// Carrega as variáveis de ambiente
dotenv.config({ path: '.env.local' })

console.log('🔍 Testando conexão com o banco...')
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Configurada' : '❌ Não configurada')

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL não encontrada no .env.local')
  process.exit(1)
}

try {
  // Testa a conexão
  const sql = postgres(process.env.DATABASE_URL, {
    ssl: { rejectUnauthorized: false }
  })
  
  console.log('🔄 Tentando conectar...')
  
  const result = await sql`SELECT current_database(), current_user, version()`
  
  console.log('✅ Conexão bem-sucedida!')
  console.log('📊 Resultado:', result[0])
  
  // Testa se a tabela existe
  const tableExists = await sql`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = 'utmparams'
    )
  `
  
  console.log('🗄️ Tabela utmparams existe:', tableExists[0].exists)
  
  await sql.end()
  
} catch (error) {
  console.error('❌ Erro na conexão:', error.message)
  console.error('🔍 Detalhes:', error)
}
