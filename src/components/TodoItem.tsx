import React from 'react'
import { Todo } from '../types'

type Props = {
  todo: Todo
  onToggle: (t: Todo) => void
  onDelete: (t: Todo) => void
  onEdit: (t: Todo, title: string) => void
}

export default function TodoItem({todo, onToggle, onDelete, onEdit}: Props){
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={()=>onToggle(todo)}
        />
        <span className={todo.done ? 'done' : ''}>{todo.title}</span>
      </label>
      <div className="actions">
        <button onClick={()=> {
          const newTitle = prompt('Chỉnh tiêu đề', todo.title)
          if (newTitle !== null) onEdit(todo, newTitle)
        }}>Edit</button>
        <button onClick={()=>onDelete(todo)}>Delete</button>
      </div>
    </li>
  )
}
