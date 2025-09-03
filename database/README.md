# Configuração do Banco de Dados PostgreSQL no Supabase

## 🚀 Passos para Configurar

### 1. Acesse o Supabase
- Vá para [supabase.com](https://supabase.com)
- Faça login na sua conta
- Acesse o projeto onde você quer criar a tabela

### 2. Execute o Script SQL
- No painel do Supabase, vá para **SQL Editor**
- Clique em **New Query**
- Cole o conteúdo do arquivo `schema.sql`
- Clique em **Run** para executar

### 3. Configure as Variáveis de Ambiente
- No painel do Supabase, vá para **Settings** > **Database**
- Copie a **Connection string** (URI)
- Crie um arquivo `.env.local` na raiz do projeto
- Adicione a variável:

```bash
DATABASE_URL=sua_connection_string_aqui
```

### 4. Teste a Conexão
- Execute o projeto: `npm run dev`
- Verifique no console se aparece: "✅ Conectado ao banco de dados PostgreSQL via Supabase"

## 🔧 Estrutura da Tabela

A tabela `utmparams` armazena:

- **Dados do dispositivo**: screen_width, screen_height, device_type, browser, os
- **Dados de rastreamento**: user_agent, specific_action, referrer_url
- **Parâmetros UTM**: utm_source, utm_medium, utm_campaign, utm_term, utm_content
- **Metadados**: id (auto-incrementado), action_timestamp (automático)

## 📊 Índices Criados

Para melhor performance, foram criados índices em:
- `utm_source` - Busca por fonte de tráfego
- `utm_campaign` - Busca por campanha
- `action_timestamp` - Ordenação por data
- `device_type` - Filtro por tipo de dispositivo

## 🧪 Testando a API

Após configurar, teste a API:

```bash
# Criar UTM
curl -X POST http://localhost:3000/api/createUTM \
  -H "Content-Type: application/json" \
  -d '{
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "teste"
  }'

# Buscar UTMs
curl "http://localhost:3000/api/createUTM?utm_source=google"
```

## 🔒 Segurança

- A tabela usa `SERIAL` para IDs únicos
- Timestamps são automáticos e não podem ser manipulados
- Todas as queries usam prepared statements para evitar SQL injection

## 📈 Monitoramento

Para monitorar o uso da tabela:
- Acesse **Table Editor** no Supabase
- Selecione a tabela `utmparams`
- Use **Logs** para ver queries executadas
- Configure **Row Level Security (RLS)** se necessário

## 🆘 Solução de Problemas

### Erro de Conexão
- Verifique se a `DATABASE_URL` está correta
- Confirme se o projeto está ativo no Supabase
- Teste a conexão no SQL Editor

### Erro de Permissão
- Verifique se o usuário tem permissão para criar tabelas
- Confirme as políticas de RLS se estiverem ativas

### Erro de SSL
- Em desenvolvimento, SSL pode ser desabilitado
- Em produção, configure SSL corretamente
