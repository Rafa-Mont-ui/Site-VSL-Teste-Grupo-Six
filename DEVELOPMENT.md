# Guia Rápido de Desenvolvimento

## Setup Rápido

```bash
# 1. Clone e instale
git clone [URL_DO_REPOSITORIO]
cd "Site VSL - Teste Grupo Six"
npm install

# 2. Configure o banco
echo "DATABASE_URL=sua_connection_string_aqui" > .env.local

# 3. Execute no Supabase
# SQL Editor → database/schema.sql
# SQL Editor → database/rls-setup.sql

# 4. Rode o projeto
npm run dev
```

## Testes Rápidos

```bash
# GET
curl "http://localhost:3000/api/createUTM?utm_source=teste"

# POST
curl -X POST http://localhost:3000/api/createUTM \
  -H "Content-Type: application/json" \
  -d '{"utm_source": "teste"}'
```

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Servidor local
npm run build        # Build produção
npm run start        # Servidor produção

# Dependências
npm install postgres --legacy-peer-deps  # Se der erro de peer
npm install [pacote]                     # Instalar novo pacote
```

## Estrutura Importante

```
├── app/api/createUTM/     # API UTM (principal)
├── lib/database.ts         # Conexão Supabase
├── lib/utm-database.ts     # Funções do banco
├── database/schema.sql     # Criação da tabela
└── .env.local             # Variáveis de ambiente
```

## Problemas Comuns

- **Erro de conexão**: Verifique se .env.local existe e DATABASE_URL está correta
- **Erro de módulo**: npm install postgres --legacy-peer-deps
- **Tabela não existe**: Execute database/schema.sql no Supabase
