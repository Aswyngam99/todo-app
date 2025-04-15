import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  return (await response.json()) as Todo[];
});

// Update Todo action
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (todo: { id: number; title: string; completed: boolean }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return await response.json();
  }
);

// Delete Todo action
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }

    return todoId;
  }
);


const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // 💡 Optimistic: immediately apply the update in the UI
    updateTodoOptimistic(state, action: PayloadAction<Todo>) {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    // ✅ Confirmed server update
    updateTodoConfirmed(state, action: PayloadAction<Todo>) {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    // ⬅️ Rollback in case of error
    revertTodoUpdate(state, action: PayloadAction<Todo>) {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong while deleting the todo';
      });
  },
});

export const { updateTodoOptimistic, updateTodoConfirmed, revertTodoUpdate } = todosSlice.actions;
export default todosSlice.reducer;
