import React from 'react';
import TodoList from './components/TodoList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTasks } from 'react-icons/fa';
function App() {
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-900 flex items-center justify-center p-4" },
        React.createElement("div", { className: "w-full max-w-4xl" },
            React.createElement("h1", { className: "flex items-center justify-center text-4xl font-extrabold mb-8 text-gray-500 gap-2" },
                React.createElement(FaTasks, { className: "text-gray-500" }),
                " Todo Manager"),
            React.createElement(TodoList, null)),
        React.createElement(ToastContainer, { position: "bottom-right", autoClose: 3000 })));
}
export default App;
