"use client"

import type React from "react"

import { useState } from "react"
import { Check, Trash, Youtube, CreditCard, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Task } from "@/lib/types"
import YouTubeEmbed from "./youtube-embed"
import PaymentButton from "./payment-button"

interface TaskItemProps {
  task: Task
  onDelete: (id: string) => void
  onToggle: (id: string) => void
  onUpdateVideo: (id: string, videoUrl: string) => void
  isEditing: boolean
  setEditing: (isEditing: boolean) => void
}

export default function TaskItem({ task, onDelete, onToggle, onUpdateVideo, isEditing, setEditing }: TaskItemProps) {
  const [expanded, setExpanded] = useState(false)
  const [videoUrl, setVideoUrl] = useState(task.videoUrl || "")

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateVideo(task.id, videoUrl)
    setEditing(false)
  }

  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const hasVideo = task.videoUrl && extractVideoId(task.videoUrl)

  return (
    <div
      className={`border rounded-lg overflow-hidden ${
        task.completed ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="p-4 flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300'
          }`}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3
              className={`font-medium ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            <div className="flex items-center gap-2 ml-2">
              {(hasVideo || task.hasPayment) && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {expanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              )}
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setEditing(!isEditing)}
            >
              <Youtube className="w-4 h-4" />
              {hasVideo ? 'Change Video' : 'Add Video'}
            </Button>

            {task.hasPayment ? (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                <CreditCard className="w-3 h-3 mr-1" /> Payment Added
              </span>
            ) : (
              <PaymentButton taskId={task.id} />
            )}
           </div>
        </div>
      </div>

      {isEditing && (
        <div className="px-4 pb-4 pt-2">
          <form onSubmit={handleVideoSubmit} className="flex gap-2">
            <Input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              className="flex-1"
            />
            <Button type="submit" size="sm">
              Save
            </Button>
          </form>
        </div>
      )}

      {expanded && (
        <div className="px-4 pb-4">
          {hasVideo && (
            <div className="mt-2">
              <YouTubeEmbed videoUrl={task.videoUrl} />
            </div>
          )}

          {task.hasPayment && (
            <div className="mt-4">
              <h4 className="font-medium text-sm text-black mb-2">
                Payment Required
              </h4>
              <PaymentButton taskId={task.id} showComplete={true} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

