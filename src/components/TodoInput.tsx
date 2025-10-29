import React, { useState } from 'react'

type Props = {
  onAdd: (title: string) => void
}
export default function TodoInput({onAdd}: Props){
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  function submit(e?: React.FormEvent){
    e?.preventDefault()
    const t = title.trim()
    if (!t) { setError('Tiêu đề không được rỗng'); return }
    if (t.length > 140) { setError('Tiêu đề quá 140 ký tự'); return }
    setError(null)
    onAdd(t)
    setTitle('')
  }

  return (
    <form onSubmit={submit} className="todo-input">
      <input
        placeholder="Thêm todo, Enter để gửi..."
        value={title}
        onChange={e=>setTitle(e.target.value)}
        aria-label="title"
      />
      <button type="submit">Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
