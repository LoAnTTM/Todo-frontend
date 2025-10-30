// src/App.tsx
import React from 'react'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
//
// 💡 Dòng import QUAN TRỌNG: Lấy từ 'hooks', không phải 'api'
//
import { useTodos } from './hook/useTodos'

export default function App() {
  // Toàn bộ logic được lấy từ hook
  const {
    todos,
    loading,
    error,
    onAdd,
    onToggle,
    onDelete,
    onEdit
  } = useTodos() // <-- Lỗi TS2305 sẽ hết khi dòng import ở trên đúng

  // Phần JSX (render)
  return (
    <div className="container">
      <h1>Todo App</h1>
      <TodoInput onAdd={onAdd} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul className="todo-list">
        {/* Lỗi TS7006 (parameter 't') cũng sẽ hết
            khi 'todos' có kiểu 'Todo[]' từ hook */
        }
        {todos.map(t => (
          <TodoItem
            key={t.id}
            todo={t} // 't' sẽ có kiểu 'Todo'
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  )
}