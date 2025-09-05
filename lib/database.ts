import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL || '', {
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
})

sql`SELECT 1`.then(() => {
  console.log('✅ Conectado ao banco de dados PostgreSQL via Supabase')
}).catch((err) => {
  console.error('❌ Erro na conexão com o banco:', err)
})

export default sql
