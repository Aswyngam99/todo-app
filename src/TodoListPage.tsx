import React from 'react';
import TodoList from './components/TodoList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-900 flex items-center justify-center p-4">
    <div className="w-full max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        📝 Todo Manager
      </h1>
      <TodoList />
    </div>
    <ToastContainer position="bottom-right" autoClose={3000} />
  </div>
  );
}

export default App;
