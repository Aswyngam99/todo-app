import React, { useEffect, useState } from 'react';
import type { Todo } from '../features/todos/todosSlice';

interface EditTodoModalProps {
  todo: Todo;
  onSave: (updatedTodo: Todo) => void;
  onClose: () => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setTitle(todo.title);
    setCompleted(todo.completed);
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTodo: Todo = {
      ...todo,
      title,
      completed,
    };

    onSave(updatedTodo);
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Edit Todo</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition"
            placeholder="Todo title"
          />
  
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="w-4 h-4 accent-gray-600 cursor-pointer" 
            />
            Mark as Completed
          </label>
  
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default EditTodoModal;