import React from 'react';
import { useTodos } from '../hooks/useTodos';

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  onClick: () => void;  // For opening the edit modal
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, onClick }) => {
  const { handleDelete, showConfirmation, confirmDelete, cancelDelete } = useTodos();

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow mb-3" role="listitem">
      
    <div
      role="button"
      tabIndex={0}
      aria-pressed="false"
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
      className={`flex-1 cursor-pointer select-none ${completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{title}</span>
        <span>{completed ? '✅' : '❌'}</span>
      </div>
    </div>

    <div className="flex gap-2 ml-4">
      {/* Delete Button */}
      <button
        onClick={() => handleDelete(id)}
        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors cursor-pointer"
        aria-label={`Delete Todo: ${title}`}
      >
        Delete
      </button>
    </div>

    {/* Confirmation Modal */}
    {showConfirmation && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        role="dialog"
        aria-labelledby={`todo-title-${id}`}
        aria-describedby="delete-confirmation-message"
      >
        <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
          <h2
            className="text-lg font-semibold mb-4 text-gray-800"
            id="delete-confirmation-message"
          >
            Are you sure you want to delete this todo?
          </h2>
          <div className="flex justify-end gap-3">
            <button
              onClick={cancelDelete}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors cursor-pointer"
              aria-label="Cancel Delete"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
              aria-label="Confirm Delete"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}

  </div>
);
};

export default TodoItem;
