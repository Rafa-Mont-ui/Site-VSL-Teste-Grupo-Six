# Site VSL - Teste Grupo Six

## Rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Executar
npm run dev
```

Acesse: http://localhost:3000

## Banco de dados (opcional)

Se quiser usar a API UTM, crie um arquivo `.env.local`:

```bash
DATABASE_URL=sua_connection_string_do_supabase
```

E execute no Supabase:

```sql
CREATE TABLE utmparams (
    id SERIAL PRIMARY KEY,
    action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100)
);
```
