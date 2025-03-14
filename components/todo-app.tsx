"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { addTask, deleteTask, toggleTask, updateTaskVideo, selectTasks } from "@/lib/features/tasks/tasksSlice"
import TaskItem from "./task-item"
import TaskForm from "./task-form"
import type { Task } from "@/lib/types"

function TodoAppContent() {
  const dispatch = useDispatch()
  const tasks = useSelector(selectTasks)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks)
      parsedTasks.forEach((task: Task) => {
        dispatch(addTask(task))
      })
    }
  }, [dispatch])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = (task: Task) => {
    dispatch(addTask(task))
  }

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id))
  }

  const handleToggleTask = (id: string) => {
    dispatch(toggleTask(id))
  }

  const handleUpdateVideo = (id: string, videoUrl: string) => {
    dispatch(updateTaskVideo({ id, videoUrl }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <TaskForm onAddTask={handleAddTask} />

      <div className="mt-6 space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
              onUpdateVideo={handleUpdateVideo}
              isEditing={editingId === task.id}
              setEditing={(isEditing) => setEditingId(isEditing ? task.id : null)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default function TodoApp() {
  return (
    <Provider store={store}>
      <TodoAppContent />
    </Provider>
  )
}

