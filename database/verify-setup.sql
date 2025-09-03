-- Script de verificação da configuração da tabela utmparams
-- Execute este script no SQL Editor do Supabase para verificar se tudo está funcionando

-- 1. Verificar se a tabela existe
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_name = 'utmparams';

-- 2. Verificar a estrutura da tabela
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'utmparams'
ORDER BY ordinal_position;

-- 3. Verificar se os índices foram criados
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'utmparams';

-- 4. Verificar se RLS está ativo
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'utmparams';

-- 5. Verificar as políticas RLS
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'utmparams';

-- 6. Testar inserção de dados
INSERT INTO utmparams (
    utm_source,
    utm_medium,
    utm_campaign,
    device_type,
    browser
) VALUES (
    'teste_verificacao',
    'teste',
    'verificacao_setup',
    'desktop',
    'Chrome'
) RETURNING id, action_timestamp;

-- 7. Verificar se os dados foram inseridos
SELECT 
    id,
    utm_source,
    utm_medium,
    utm_campaign,
    device_type,
    browser,
    action_timestamp
FROM utmparams 
WHERE utm_source = 'teste_verificacao'
ORDER BY action_timestamp DESC;

-- 8. Limpar dados de teste (opcional)
-- DELETE FROM utmparams WHERE utm_source = 'teste_verificacao';

-- 9. Verificar estatísticas da tabela
SELECT 
    schemaname,
    tablename,
    n_tup_ins as total_inserts,
    n_tup_upd as total_updates,
    n_tup_del as total_deletes
FROM pg_stat_user_tables 
WHERE tablename = 'utmparams';
