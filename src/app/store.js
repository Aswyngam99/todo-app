import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
export var store = configureStore({
    reducer: {
        todos: todosReducer, // <-- this name must match!
    },
});
