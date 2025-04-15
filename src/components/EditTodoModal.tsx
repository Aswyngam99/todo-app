import React, { useState, useEffect } from 'react';
import type { Todo } from '../features/todos/todosSlice';

interface EditTodoModalProps {
  todo: Todo | null;
  onSave: (updatedTodo: Todo) => void;
  onClose: () => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      onSave({ ...todo, title, completed });
    }
  };

  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Title</label>
            <input
              className="w-full p-2 border rounded"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              id="completed"
              type="checkbox"
              checked={completed}
              onChange={e => setCompleted(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="completed" className="text-sm text-gray-700 dark:text-gray-200">
              Completed
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditTodoModal);
