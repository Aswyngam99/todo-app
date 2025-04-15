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

    // Build updated todo — 100% safe because `todo` is no longer nullable.
    const updatedTodo: Todo = {
      ...todo,
      title,
      completed,
    };

    onSave(updatedTodo);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Edit Todo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            placeholder="Todo title"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Completed
          </label>

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

export default EditTodoModal;