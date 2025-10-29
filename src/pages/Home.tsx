import React, { useState } from 'react';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import { Todo } from '../api/types';

const Home: React.FC = () => {
  // Dữ liệu mẫu
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Học React', done: false },
    { id: 2, title: 'Học TypeScript', done: true },
    { id: 3, title: 'Làm project Todo List', done: false },
  ]);

  // Handlers
  const addTodo = async (title: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      done: false
    };
    setTodos([...todos, newTodo]);
    return Promise.resolve();
  };

  const toggleTodo = async (id: number, currentDone: boolean) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
    return Promise.resolve();
  };

  const deleteTodo = async (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    return Promise.resolve();
  };

  const remainingTasks = todos.filter(t => !t.done).length;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Todo List ({remainingTasks} tasks remaining)</h1>
      
      {/* 1. Todo Input */}
      <TodoInput onAdd={addTodo} apiError={null} /> 
      
      {/* 2. Danh sách Todos */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
        {todos.length === 0 && <p style={{ color: '#666' }}>Không có công việc nào. Hãy thêm một công việc mới!</p>}
      </ul>
    </div>
  );
};

export default Home;