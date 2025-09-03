# Checklist de Validação

## Setup Inicial

- [ ] Node.js instalado (versão 18+)
- [ ] Repositório clonado
- [ ] Dependências instaladas (npm install)
- [ ] Arquivo .env.local criado
- [ ] DATABASE_URL configurada

## Configuração do Supabase

- [ ] Conta Supabase criada
- [ ] Projeto criado e ativo
- [ ] Script schema.sql executado
- [ ] Script rls-setup.sql executado
- [ ] Tabela utmparams criada
- [ ] Políticas RLS configuradas

## Conexão com Banco

- [ ] DATABASE_URL correta
- [ ] Senha válida
- [ ] Projeto ativo no Supabase
- [ ] SSL configurado corretamente

## Testes da API

### Teste GET
- [ ] Status 200 retornado
- [ ] Dados UTM recebidos
- [ ] Timestamp incluído
- [ ] Formato JSON válido

### Teste POST
- [ ] Status 201 retornado
- [ ] Dados salvos no banco
- [ ] ID retornado (database_id)
- [ ] Persistência confirmada

## Verificação no Banco

- [ ] Dados inseridos na tabela
- [ ] Timestamps automáticos
- [ ] IDs auto-incrementados
- [ ] Índices criados

## Validação de Erros

- [ ] Dados inválidos retornam erro 400
- [ ] Método incorreto retorna erro 405
- [ ] Erro de banco tratado corretamente
- [ ] Fallback funciona sem banco

## Segurança

- [ ] RLS habilitado
- [ ] Políticas configuradas
- [ ] Prepared statements funcionando
- [ ] Variáveis de ambiente seguras

## Funcionalidades

- [ ] API GET funcionando
- [ ] API POST funcionando
- [ ] Validação de dados
- [ ] Tratamento de erros
- [ ] Logs no console

## Resultado Final

- [ ] Projeto rodando localmente
- [ ] API UTM funcionando
- [ ] Banco de dados conectado
- [ ] Dados sendo salvos
- [ ] Logs funcionando

---
