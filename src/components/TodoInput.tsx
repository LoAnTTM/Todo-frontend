// src/components/TodoInput.tsx
import React, { useState } from 'react'

type Props = {
  onAdd: (title: string) => void
}
export default function TodoInput({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  function submit(e?: React.FormEvent) {
    e?.preventDefault()
    const t = title.trim()
    
    // Logic validation
    if (!t) { setError('Tiêu đề không được rỗng'); return }
    if (t.length > 140) { setError('Tiêu đề quá 140 ký tự'); return }
    
    setError(null)
    onAdd(t)
    setTitle('')
  }

  return (
    // Dùng Fragment để bọc form và div lỗi
    <>
      <form onSubmit={submit} className="todo-input">
        <input
          placeholder="Thêm todo, Enter để gửi..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          aria-label="title"
        />
        <button type="submit">Add</button>
      </form>
      {/* Đưa lỗi ra ngoài form để không ảnh hưởng layout flex */}
      {error && <div className="error">{error}</div>}
    </>
  )
}