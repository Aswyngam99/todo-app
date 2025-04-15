import React, { useState, Suspense } from 'react'
import { useTodos } from '../hooks/useTodos'
import TodoItem from './TodoItem'
import FilterBar from './FilterBar'

const EditTodoModal = React.lazy(() => import('./EditTodoModal'));

export default function TodoList() {
  const {todos, status, handleUpdate } = useTodos();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' ||
      (filter === 'Completed' && todo.completed) ||
      (filter === 'Incomplete' && !todo.completed);
    return matchesSearch && matchesFilter;
  });

  // Paginate filtered todos
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (id: number) => {
    setSelectedTodoId(id);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);
  if (selectedTodo) {
    console.log("Selected Todo UserID:", selectedTodo.userId);
  } else {
    console.log("Todo not found for ID:", selectedTodoId);
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <FilterBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

      {status === 'loading' && <p>Loading...</p>}

      {paginatedTodos.map(todo => (
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

       {/* Pagination controls */}
       <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Next
        </button>
      </div>

    </div>
  );
}
