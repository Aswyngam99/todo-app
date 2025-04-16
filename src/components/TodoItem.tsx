import React from 'react';
import { useTodos } from '../hooks/useTodos';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

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
        className={`flex items-center gap-2 cursor-pointer ${completed ? 'line-through text-gray-400' : ''}`}
      >
        {completed ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
        <span>{title}</span>
      </div>

      <div className="flex gap-3">
        {/* Edit Button */}
        <button
          onClick={onClick}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label={`Edit Todo: ${title}`}
        >
          <FaEdit />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => handleDelete(id)}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label={`Delete Todo: ${title}`}
        >
          <FaTrash />
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this todo?
            </h2>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
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
