import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';
import FilterBar from './FilterBar';
var EditTodoModal = React.lazy(function () { return import('./EditTodoModal'); });
export default function TodoList() {
    var _a = useTodos(), todos = _a.todos, status = _a.status, handleUpdate = _a.handleUpdate;
    var _b = useState(''), search = _b[0], setSearch = _b[1];
    var _c = useState('All'), filter = _c[0], setFilter = _c[1];
    var _d = useState(null), selectedTodoId = _d[0], setSelectedTodoId = _d[1];
    var _e = useState(1), currentPage = _e[0], setCurrentPage = _e[1];
    var itemsPerPage = 5;
    var filteredTodos = todos.filter(function (todo) {
        var matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
        var matchesFilter = filter === 'All' ||
            (filter === 'Completed' && todo.completed) ||
            (filter === 'Incomplete' && !todo.completed);
        return matchesSearch && matchesFilter;
    });
    // Paginate filtered todos
    var totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
    var paginatedTodos = filteredTodos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    // Handle page change
    var handlePageChange = function (page) {
        setCurrentPage(page);
    };
    var handleOpenModal = function (id) {
        setSelectedTodoId(id);
    };
    var handleCloseModal = function () {
        setSelectedTodoId(null);
    };
    var selectedTodo = todos.find(function (todo) { return todo.id === selectedTodoId; });
    if (selectedTodo) {
        console.log("Selected Todo UserID:", selectedTodo.userId);
    }
    else {
        console.log("Todo not found for ID:", selectedTodoId);
    }
    return (React.createElement("div", { className: "p-6 max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl" },
        React.createElement("h1", { className: "text-3xl font-bold text-center mb-6 text-gray-800" }, "My Todo List"),
        React.createElement(FilterBar, { search: search, setSearch: setSearch, filter: filter, setFilter: setFilter }),
        status === 'loading' && React.createElement("p", { className: "text-center mt-6 text-gray-500" }, "Loading..."),
        React.createElement(AnimatePresence, null, paginatedTodos.map(function (todo) { return (
        //   <motion.div
        //   key={todo.id}
        //   initial={{ opacity: 0, x: -1 }}
        //   animate={{ opacity: 1, x: 0 }}
        //   exit={{ opacity: 0, x: 1 }}
        //   transition={{ duration: 0.2 }}
        // >
        React.createElement(TodoItem, { key: todo.id, id: todo.id, title: todo.title, completed: todo.completed, onClick: function () { return handleOpenModal(todo.id); } })
        // </motion.div>
        ); })),
        React.createElement(AnimatePresence, null, selectedTodo && (React.createElement(motion.div, { key: "edit-modal", initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.2 }, className: "fixed inset-0 flex items-center justify-center z-50" },
            React.createElement(Suspense, { fallback: React.createElement("div", { className: "text-center text-gray-500" }, "Loading editor...") },
                React.createElement(EditTodoModal, { todo: selectedTodo, onClose: handleCloseModal, onSave: function (updatedTodo) {
                        handleUpdate(updatedTodo);
                        handleCloseModal();
                    } }))))),
        React.createElement("div", { className: "flex justify-center items-center gap-2 mt-6" },
            React.createElement("button", { onClick: function () { return setCurrentPage(function (prev) { return Math.max(prev - 1, 1); }); }, disabled: currentPage === 1, className: "px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 cursor-pointer" }, "Prev"),
            React.createElement("span", { className: "text-gray-600 font-semibold" },
                currentPage,
                " / ",
                totalPages),
            React.createElement("button", { onClick: function () { return setCurrentPage(function (prev) { return Math.min(prev + 1, totalPages); }); }, disabled: currentPage === totalPages, className: "px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 cursor-pointer" }, "Next"))));
}
