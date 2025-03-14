"use client"

import type React from "react"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Task } from "@/lib/types"

interface TaskFormProps {
  onAddTask: (task: Task) => void
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim()) {
      const newTask: Task = {
        id: uuidv4(),
        title: title.trim(),
        completed: false,
        videoUrl: "",
        hasPayment: false,
      }

      onAddTask(newTask)
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex lg:flex-row flex-col gap-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 outline-none text-black"
      />
      <Button type="submit">Add Task</Button>
    </form>
  )
}

