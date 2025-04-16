import React, { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Todo List</h1>
      <FilterBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

      {status === 'loading' && <p className="text-center mt-6 text-gray-500">Loading...</p>}

      <AnimatePresence>
      {paginatedTodos.map(todo => (
        //   <motion.div
        //   key={todo.id}
        //   initial={{ opacity: 0, x: -1 }}
        //   animate={{ opacity: 1, x: 0 }}
        //   exit={{ opacity: 0, x: 1 }}
        //   transition={{ duration: 0.2 }}
        // >
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          onClick={() => handleOpenModal(todo.id)}
        />
        // </motion.div>
      ))}
      </AnimatePresence>

      <AnimatePresence>
      {selectedTodo && (
         <motion.div
         key="edit-modal"
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: 0.95 }}
         transition={{ duration: 0.2 }}
         className="fixed inset-0 flex items-center justify-center z-50"
       >
        <Suspense fallback={<div className="text-center text-gray-500">Loading editor...</div>}>
          <EditTodoModal
            todo={selectedTodo}
            onClose={handleCloseModal}
            onSave={(updatedTodo) => {
              handleUpdate(updatedTodo);
              handleCloseModal();
            }}
          />
        </Suspense>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span className="text-gray-600 font-semibold">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>

    </div>
  );
}
