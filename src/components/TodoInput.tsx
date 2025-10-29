import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

export default function TodoInput() {
  const [title, setTitle] = useState('');
  const { create } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') return;

    create.mutate({ title: title.trim() }, {
      onSuccess: () => {
        setTitle(''); 
      },
      onError: (error) => {
        alert(error.message); 
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={create.isPending ? "Đang thêm..." : "Nhập tiêu đề Todo (Enter để thêm)"}
        disabled={create.isPending}
        style={{ padding: '10px', width: '300px', marginRight: '10px' }}
      />
      <button type="submit" disabled={create.isPending}>
        Thêm
      </button>
      {create.isError && <p style={{ color: 'red' }}>Lỗi không mong muốn!</p>}
    </form>
  );
}