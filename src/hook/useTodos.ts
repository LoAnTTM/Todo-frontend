// src/hooks/useTodos.ts
import { useEffect, useState } from 'react'
import { Todo } from '../types'
// Dòng import này rất quan trọng
// Nó đi ra khỏi 'hooks' (../) rồi vào 'api/'
import * as api from '../api/todos'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 1. Tải danh sách todos khi component được mount
  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      // Dùng hàm đã import: api.fetchTodos()
      const data = await api.fetchTodos()
      setTodos(data)
    } catch (e: any) {
      setError(e.message || 'Không thể tải todos')
    } finally {
      setLoading(false)
    }
  }

  // 2. Hàm thêm mới todo
  async function handleAdd(title: string) {
    const temp: Todo = { id: Date.now(), title, done: false }
    setTodos(prev => [temp, ...prev])

    try {
      // Dùng hàm đã import: api.createTodo()
      const created = await api.createTodo(title)
      setTodos(prev => prev.map(t => t.id === temp.id ? created : t))
    } catch (e: any) {
      setTodos(prev => prev.filter(t => t.id !== temp.id))
      alert(e.message || 'Lỗi khi tạo')
    }
  }

  // 3. Hàm bật/tắt trạng thái 'done'
  async function handleToggle(t: Todo) {
    const prev = todos
    setTodos(prevState => prevState.map(x => x.id === t.id ? { ...x, done: !x.done } : x))

    try {
      // Dùng hàm đã import: api.updateTodo()
      await api.updateTodo(t.id, { done: !t.done })
    } catch (e: any) {
      setTodos(prev)
      alert(e.message || 'Lỗi khi cập nhật')
    }
  }

  // 4. Hàm xóa todo
  async function handleDelete(t: Todo) {
    const prev = todos
    setTodos(prevState => prevState.filter(x => x.id !== t.id))

    try {
      // Dùng hàm đã import: api.deleteTodo()
      await api.deleteTodo(t.id)
    } catch (e: any) {
      setTodos(prev)
      alert(e.message || 'Lỗi khi xóa')
    }
  }

  // 5. Hàm sửa todo
  async function handleEdit(t: Todo, title: string) {
    const trimmed = title.trim()
    if (!trimmed) return

    const prev = todos
    setTodos(prevState => prevState.map(x => x.id === t.id ? { ...x, title: trimmed } : x))

    try {
      // Dùng hàm đã import: api.updateTodo()
      await api.updateTodo(t.id, { title: trimmed })
    } catch (e: any) {
      setTodos(prev)
      alert(e.message || 'Lỗi khi sửa')
    }
  }

  // Trả về state và các hàm xử lý
  return {
    todos,
    loading,
    error,
    onAdd: handleAdd,
    onToggle: handleToggle,
    onDelete: handleDelete,
    onEdit: handleEdit,
  }
}