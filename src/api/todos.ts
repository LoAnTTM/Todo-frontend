// src/api/todos.ts
import { Todo } from '../types'

// Lấy API URL từ biến môi trường .env
const API: any = import.meta.env.VITE_API_URL || '/api'

/**
 * Hàm lấy toàn bộ danh sách todo
 */
export async function fetchTodos(): Promise<Todo[]> {
    const res = await fetch(`${API}/todos`)
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}

/**
 * Hàm tạo todo mới
 */
export async function createTodo(title: string): Promise<Todo> {
  const res = await fetch(`${API}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  if (res.status === 422 || res.status === 400) {
    const err = await res.json().catch(() => ({ detail: 'Validation error' }))
    throw new Error(err.detail || 'Validation error')
  }
  if (!res.ok) throw new Error('Failed to create todo')
  return res.json()
}

/**
 * Hàm cập nhật một todo (sửa title hoặc trạng thái done)
 */
export async function updateTodo(id: number, patch: Partial<Todo>): Promise<Todo> {
  const res = await fetch(`${API}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch)
  })
  if (!res.ok) {
    if (res.status === 404) throw new Error('Todo không tồn tại')
    throw new Error('Failed to update')
  }
  return res.json()
}

/**
 * Hàm xóa một todo
 */
export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API}/todos/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    if (res.status === 404) throw new Error('Todo không tồn tại')
    throw new Error('Failed to delete')
  }
}