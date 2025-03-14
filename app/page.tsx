import TodoApp from "@/components/todo-app"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-200"> To-Do</h1>
        <TodoApp />
      </div>
    </main>
  )
}

