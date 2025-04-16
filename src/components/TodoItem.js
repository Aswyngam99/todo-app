import React from 'react';
import { useTodos } from '../hooks/useTodos';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
var TodoItem = function (_a) {
    var id = _a.id, title = _a.title, completed = _a.completed, onClick = _a.onClick;
    var _b = useTodos(), handleDelete = _b.handleDelete, showConfirmation = _b.showConfirmation, confirmDelete = _b.confirmDelete, cancelDelete = _b.cancelDelete;
    return (React.createElement("div", { className: "flex items-center justify-between p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow mb-3", role: "listitem" },
        React.createElement("div", { role: "button", tabIndex: 0, "aria-pressed": "false", onClick: onClick, onKeyDown: function (e) { if (e.key === 'Enter')
                onClick(); }, className: "flex items-center gap-2 cursor-pointer ".concat(completed ? 'line-through text-gray-400' : '') },
            completed ? React.createElement(FaCheck, { className: "text-green-500" }) : React.createElement(FaTimes, { className: "text-red-500" }),
            React.createElement("span", null, title)),
        React.createElement("div", { className: "flex gap-3" },
            React.createElement("button", { onClick: onClick, className: "text-gray-500 hover:text-gray-700 cursor-pointer", "aria-label": "Edit Todo: ".concat(title) },
                React.createElement(FaEdit, null)),
            React.createElement("button", { onClick: function () { return handleDelete(id); }, className: "text-gray-500 hover:text-gray-700 cursor-pointer", "aria-label": "Delete Todo: ".concat(title) },
                React.createElement(FaTrash, null))),
        showConfirmation && (React.createElement("div", { className: "fixed inset-0 bg-black/20 flex justify-center items-center z-50" },
            React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-lg w-96" },
                React.createElement("h2", { className: "text-lg font-semibold mb-4 text-gray-800" }, "Are you sure you want to delete this todo?"),
                React.createElement("div", { className: "flex justify-end gap-2" },
                    React.createElement("button", { onClick: cancelDelete, className: "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer" }, "Cancel"),
                    React.createElement("button", { onClick: confirmDelete, className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer" }, "Confirm")))))));
};
export default TodoItem;
