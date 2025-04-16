import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TodoListPage from './TodoListPage';
import { store } from './app/store';
import { Provider } from 'react-redux';
import React from 'react';
createRoot(document.getElementById('root')).render(React.createElement(StrictMode, null,
    React.createElement(Provider, { store: store },
        React.createElement(TodoListPage, null))));
