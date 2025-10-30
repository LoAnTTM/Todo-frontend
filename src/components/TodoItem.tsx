// src/components/TodoItem.tsx
import React, { useState } from 'react'
import { Todo } from '../types'

type Props = {
  todo: Todo
  onToggle: (t: Todo) => void
  onDelete: (t: Todo) => void
  onEdit: (t: Todo, title: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  const handleSave = () => {
    const trimmed = title.trim()
    if (!trimmed) { alert('Tiêu đề không được rỗng'); return }
    if (trimmed.length > 140) { alert('Tiêu đề quá 140 ký tự'); return }
    
    onEdit(todo, trimmed)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTitle(todo.title) // Reset lại title cũ
  }
  
  // Khi đang ở chế độ chỉnh sửa
  if (isEditing) {
    return (
      <li className="todo-item todo-item-editing">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <div className="actions">
          {/* Dùng class từ file styles.css của bạn */}
          <button className="btn-edit" onClick={handleSave}>Save</button>
          <button className="btn-delete" onClick={handleCancel}>Cancel</button>
        </div>
      </li>
    )
  }

  // Khi ở chế độ xem bình thường
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo)}
        />
        <span className={todo.done ? 'done' : ''}>{todo.title}</span>
      </label>
      <div className="actions">
        {/* Dùng class từ file styles.css của bạn */}
        <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="btn-delete" onClick={() => onDelete(todo)}>Delete</button>
      </div>
    </li>
  )
}