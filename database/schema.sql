-- Script para criar a tabela utmparams no Supabase
-- Execute este script no SQL Editor do Supabase

CREATE TABLE IF NOT EXISTS utmparams (
    id SERIAL PRIMARY KEY,
    action_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    screen_width INT,
    screen_height INT,
    device_type VARCHAR(50), -- ex: mobile, desktop, tablet
    browser VARCHAR(100),
    os VARCHAR(100),
    user_agent TEXT,
    specific_action VARCHAR(100), -- ex: "button_click", "form_submit"
    referrer_url TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_term VARCHAR(100),
    utm_content VARCHAR(100)
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_utmparams_utm_source ON utmparams(utm_source);
CREATE INDEX IF NOT EXISTS idx_utmparams_utm_campaign ON utmparams(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_utmparams_action_timestamp ON utmparams(action_timestamp);
CREATE INDEX IF NOT EXISTS idx_utmparams_device_type ON utmparams(device_type);

-- Comentários para documentar a tabela
COMMENT ON TABLE utmparams IS 'Tabela para armazenar parâmetros UTM e dados de rastreamento de usuários';
COMMENT ON COLUMN utmparams.id IS 'ID único auto-incrementado';
COMMENT ON COLUMN utmparams.action_timestamp IS 'Timestamp da ação (automático)';
COMMENT ON COLUMN utmparams.screen_width IS 'Largura da tela do dispositivo';
COMMENT ON COLUMN utmparams.screen_height IS 'Altura da tela do dispositivo';
COMMENT ON COLUMN utmparams.device_type IS 'Tipo de dispositivo (mobile, desktop, tablet)';
COMMENT ON COLUMN utmparams.browser IS 'Nome do navegador';
COMMENT ON COLUMN utmparams.os IS 'Sistema operacional';
COMMENT ON COLUMN utmparams.user_agent IS 'User agent completo do navegador';
COMMENT ON COLUMN utmparams.specific_action IS 'Ação específica realizada pelo usuário';
COMMENT ON COLUMN utmparams.referrer_url IS 'URL de referência (de onde veio o usuário)';
COMMENT ON COLUMN utmparams.utm_source IS 'Fonte do tráfego (ex: google, facebook)';
COMMENT ON COLUMN utmparams.utm_medium IS 'Meio de marketing (ex: cpc, social)';
COMMENT ON COLUMN utmparams.utm_campaign IS 'Nome da campanha';
COMMENT ON COLUMN utmparams.utm_term IS 'Palavras-chave pagas';
COMMENT ON COLUMN utmparams.utm_content IS 'Conteúdo específico da campanha';

-- Exemplo de inserção de dados de teste
-- INSERT INTO utmparams (
--     screen_width,
--     screen_height,
--     device_type,
--     browser,
--     os,
--     user_agent,
--     specific_action,
--     referrer_url,
--     utm_source,
--     utm_medium,
--     utm_campaign,
--     utm_term,
--     utm_content
-- ) VALUES (
--     1920,
--     1080,
--     'desktop',
--     'Chrome',
--     'Windows',
--     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
--     'button_click',
--     'https://google.com',
--     'google',
--     'cpc',
--     'black_friday_2024',
--     'desconto',
--     'banner_principal'
-- );
