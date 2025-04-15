import React, { useState, Suspense } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';
import FilterBar from './FilterBar';

const EditTodoModal = React.lazy(() => import('./EditTodoModal'));

export default function TodoList() {
  const {todos, status, handleUpdate, handleDelete } = useTodos();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' ||
      (filter === 'Completed' && todo.completed) ||
      (filter === 'Incomplete' && !todo.completed);
    return matchesSearch && matchesFilter;
  });

  const handleOpenModal = (id: number) => {
    setSelectedTodoId(id);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <FilterBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

      {status === 'loading' && <p>Loading...</p>}

      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          onClick={() => handleOpenModal(todo.id)}
        />
      ))}

      {selectedTodo && (
        <Suspense fallback={<div className="text-center">Loading editor...</div>}>
          <EditTodoModal
            todo={selectedTodo}
            onClose={handleCloseModal}
            onSave={(updatedTodo) => {
              handleUpdate(updatedTodo);
              handleCloseModal();
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
