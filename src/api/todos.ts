import { Todo } from '../types'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API}/todos`)
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}

export async function createTodo(title: string): Promise<Todo> {
  const res = await fetch(`${API}/todos`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title})
  })
  if (res.status === 422 || res.status === 400) {
    const err = await res.json().catch(()=>({detail:'Validation error'}))
    throw new Error(err.detail || 'Validation error')
  }
  if (!res.ok) throw new Error('Failed to create todo')
  return res.json()
}

export async function updateTodo(id: number, patch: Partial<Todo>): Promise<Todo> {
  const res = await fetch(`${API}/todos/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(patch)
  })
  if (!res.ok) {
    if (res.status === 404) throw new Error('Todo không tồn tại')
    throw new Error('Failed to update')
  }
  return res.json()
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API}/todos/${id}`, {method: 'DELETE'})
  if (!res.ok) {
    if (res.status === 404) throw new Error('Todo không tồn tại')
    throw new Error('Failed to delete')
  }
}
