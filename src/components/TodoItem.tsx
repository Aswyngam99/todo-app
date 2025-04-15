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
    <div className="flex items-center justify-between p-4 border-b" role="listitem">
      <div>
       <div
      role="button"
      tabIndex={0}
      aria-pressed="false"
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
      className={`flex justify-between items-center p-4 border-b cursor-pointer ${completed ? 'line-through text-gray-400' : ''}`}
    >
      <span>{title}</span>
      <span>{completed ? '✅' : '❌'}</span>
    </div>
      </div>
      <div className="flex gap-2">
        {/* Edit Todo Button (Opens modal) */}
        {/* <button
          onClick={onClick}  // Opens edit modal
          className="text-blue-600 hover:text-blue-800"
          aria-label={`Edit Todo: ${title}`}  // ARIA label for editing
          tabIndex={0}  // Ensure it's focusable and part of the tab order
        >
          Edit
        </button> */}
        
        {/* Delete Todo Button */}
        <button
          onClick={() => handleDelete(id)}  // Triggers delete confirmation
          className="text-red-600 hover:text-red-800"
          aria-label={`Delete Todo: ${title}`}  // ARIA label for deleting
          tabIndex={0}  // Ensure it's focusable and part of the tab order
        >
          Delete
        </button>
      </div>

      {/* Confirmation Dialog for Deletion */}
      {showConfirmation && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"  // ARIA role for the confirmation dialog
          aria-labelledby={`todo-title-${id}`}  // Link the dialog to the todo title for context
          aria-describedby="delete-confirmation-message"  // Provide additional description for the action
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96" role="document">
            <h2 
              className="text-lg font-semibold mb-4 text-gray-800"
              id="delete-confirmation-message"
            >
              Are you sure you want to delete this todo?
            </h2>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                aria-label="Cancel Delete"
                tabIndex={0}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                aria-label="Confirm Delete"
                tabIndex={0}
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
