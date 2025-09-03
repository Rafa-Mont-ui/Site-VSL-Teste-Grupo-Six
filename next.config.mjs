/** @type {import('next').NextConfig} */
const nextConfig = {
  // Desabilitar build estático para evitar problemas com window
  output: 'standalone',
  
  // Configurações de imagens
  images: {
    unoptimized: true,
  },
}

export default nextConfig
