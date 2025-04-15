import React from 'react';
import TodoList from './components/TodoList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Todo Manager</h1>
      <TodoList />
      <ToastContainer />
    </div>
  );
}

export default App;
