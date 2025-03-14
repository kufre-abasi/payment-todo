import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Task } from "@/lib/types"
import type { RootState } from "@/lib/store"

interface TasksState {
  items: Task[]
}

const initialState: TasksState = {
  items: [],
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload)
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((task) => task.id !== action.payload)
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.items.find((task) => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    updateTaskVideo: (state, action: PayloadAction<{ id: string; videoUrl: string }>) => {
      const task = state.items.find((task) => task.id === action.payload.id)
      if (task) {
        task.videoUrl = action.payload.videoUrl
      }
    },
    updateTaskPayment: (state, action: PayloadAction<{ id: string; hasPayment: boolean }>) => {
      const task = state.items.find((task) => task.id === action.payload.id)
      if (task) {
        task.hasPayment = action.payload.hasPayment
      }
    },
  },
})

export const { addTask, deleteTask, toggleTask, updateTaskVideo, updateTaskPayment } = tasksSlice.actions

export const selectTasks = (state: RootState) => state.tasks.items

export default tasksSlice.reducer

