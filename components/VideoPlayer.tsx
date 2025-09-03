"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoPlayerProps {
  videoId: string
  onPlayChange?: (isPlaying: boolean) => void
  onMuteChange?: (isMuted: boolean) => void
  autoplay?: boolean
}

export default function VideoPlayer({ videoId, onPlayChange, onMuteChange, autoplay = false }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isMuted, setIsMuted] = useState(true)

  // Função para iniciar o vídeo automaticamente
  const startAutoplay = () => {
    if (autoplay && iframeRef.current) {
      const currentSrc = iframeRef.current.src
      const newSrc = currentSrc.replace('mute=1', 'mute=0') + '&autoplay=1'
      iframeRef.current.src = newSrc
      setIsPlaying(true)
      onPlayChange?.(true)
    }
  }

  // Efeito para autoplay quando o componente montar
  useEffect(() => {
    if (autoplay) {
      // Pequeno delay para garantir que o iframe carregou
      const timer = setTimeout(startAutoplay, 500)
      return () => clearTimeout(timer)
    }
  }, [autoplay])

  const postMessage = (command: string, value?: any) => {
    const iframe = iframeRef.current
    if (!iframe) return

    iframe.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: value ? [value] : [],
      }),
      "*",
    )
  }

  const togglePlay = () => {
    postMessage(isPlaying ? "pauseVideo" : "playVideo")
    setIsPlaying(!isPlaying)
  onPlayChange?.(!isPlaying)
  }

  const toggleMute = () => {
    postMessage(isMuted ? "unMute" : "mute")
    setIsMuted(!isMuted)
  onMuteChange?.(!isMuted)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&modestbranding=1&rel=0&playsinline=1&mute=${isMuted ? 1 : 0}`}
          title="Vídeo de Apresentação do Método"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95"
          aria-pressed={isPlaying}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? "Pausar" : "Reproduzir"}
        </button>

        <button
          onClick={toggleMute}
          className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-xl transition-all duration-200 active:scale-95"
          aria-pressed={isMuted}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          {isMuted ? "Ativar Som" : "Silenciar"}
        </button>
      </div>
    </div>
  )
}
