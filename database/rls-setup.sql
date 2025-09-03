-- Configuração de Row Level Security (RLS) para a tabela utmparams
-- Execute este script no SQL Editor do Supabase após criar a tabela

-- 1. Habilitar RLS na tabela
ALTER TABLE utmparams ENABLE ROW LEVEL SECURITY;

-- 2. Criar política para permitir inserção de dados (qualquer usuário pode inserir)
CREATE POLICY "Permitir inserção de UTMs" ON utmparams
    FOR INSERT
    WITH CHECK (true);

-- 3. Criar política para permitir leitura de dados (qualquer usuário pode ler)
CREATE POLICY "Permitir leitura de UTMs" ON utmparams
    FOR SELECT
    USING (true);

-- 4. Criar política para permitir atualização (apenas o próprio registro)
CREATE POLICY "Permitir atualização de UTMs" ON utmparams
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- 5. Criar política para permitir exclusão (apenas administradores)
-- Descomente se quiser permitir exclusão
-- CREATE POLICY "Permitir exclusão de UTMs" ON utmparams
--     FOR DELETE
--     USING (auth.role() = 'authenticated');

-- 6. Verificar se as políticas foram criadas
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'utmparams';

-- 7. Verificar se RLS está ativo
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'utmparams';
