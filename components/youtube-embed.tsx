"use client"

import { useState, useEffect } from "react"

interface YouTubeEmbedProps {
  videoUrl: string
}

export default function YouTubeEmbed({ videoUrl }: YouTubeEmbedProps) {
  const [videoId, setVideoId] = useState<string | null>(null)

  useEffect(() => {
    const extractVideoId = (url: string): string | null => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[2].length === 11 ? match[2] : null
    }

    setVideoId(extractVideoId(videoUrl))
  }, [videoUrl])

  if (!videoId) {
    return <div className="text-red-500 text-sm">Invalid YouTube URL</div>
  }

  return (
    <div className="aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-md"
      ></iframe>
    </div>
  )
}

