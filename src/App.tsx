import React, { useEffect, useState } from 'react'
import { Todo } from './types'
import * as api from './api/todos'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'

export default function App(){
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{ load() }, [])

  async function load(){
    setLoading(true)
    setError(null)
    try {
      const data = await api.fetchTodos()
      setTodos(data)
    } catch (e:any){
      setError(e.message || 'Không thể tải todos')
    } finally { setLoading(false) }
  }

  async function handleAdd(title: string){
    // optimistic: add temporary
    const temp: Todo = {id: Date.now(), title, done: false}
    setTodos(prev=>[temp, ...prev])
    try {
      const created = await api.createTodo(title)
      setTodos(prev => prev.map(t => t.id === temp.id ? created : t))
    } catch (e:any){
      setTodos(prev => prev.filter(t => t.id !== temp.id))
      alert(e.message || 'Lỗi khi tạo')
    }
  }

  async function handleToggle(t: Todo){
    const prev = todos
    setTodos(prevState => prevState.map(x => x.id === t.id ? {...x, done: !x.done} : x))
    try {
      await api.updateTodo(t.id, { done: !t.done })
    } catch (e:any){
      setTodos(prev)
      alert(e.message || 'Lỗi khi cập nhật')
    }
  }

  async function handleDelete(t: Todo){
    const prev = todos
    setTodos(prevState => prevState.filter(x => x.id !== t.id))
    try {
      await api.deleteTodo(t.id)
    } catch (e:any){
      setTodos(prev)
      alert(e.message || 'Lỗi khi xóa')
    }
  }

  async function handleEdit(t: Todo, title: string){
    const trimmed = title.trim()
    if (!trimmed) { alert('Tiêu đề không được rỗng'); return }
    if (trimmed.length > 140) { alert('Tiêu đề quá 140 ký tự'); return }
    const prev = todos
    setTodos(prevState => prevState.map(x => x.id === t.id ? {...x, title: trimmed} : x))
    try {
      await api.updateTodo(t.id, { title: trimmed })
    } catch (e:any){
      setTodos(prev)
      alert(e.message || 'Lỗi khi sửa')
    }
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <TodoInput onAdd={handleAdd} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul className="todo-list">
        {todos.map(t=>(
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>
      <footer>
        <small>VITE_API_URL = {import.meta.env.VITE_API_URL || 'http://localhost:8000'}</small>
      </footer>
    </div>
  )
}
