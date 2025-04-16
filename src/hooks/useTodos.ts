import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTodos, updateTodoOptimistic, updateTodoConfirmed, revertTodoUpdate } from '../features/todos/todosSlice';
import type { RootState, AppDispatch } from '../app/store';
import type { Todo } from '../features/todos/todosSlice';
import { deleteTodo } from '../features/todos/todosSlice';
import { toast } from 'react-toastify';

export const useTodos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const status = useSelector((state: RootState) => state.todos.status);
  const error = useSelector((state: RootState) => state.todos.error);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  const handleUpdate = async (updatedTodo: Todo) => {
    const previousTodo = todos.find(t => t.id === updatedTodo.id);
    if (!previousTodo) return;

    try {
      dispatch(updateTodoOptimistic(updatedTodo));  // Instant UI update
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) throw new Error('Failed to update on server');

      const savedTodo = await response.json();
      dispatch(updateTodoConfirmed(savedTodo));  // Confirm update from server
    } catch (error) {
      dispatch(revertTodoUpdate(previousTodo));  // Rollback if server failed
    }
  };

  const handleDelete = async (todoId: number) => {
    setShowConfirmation(true);
    setTodoToDelete(todoId);
  };

  const confirmDelete = async () => {
    if (todoToDelete !== null) {
      try {
        await dispatch(deleteTodo(todoToDelete)); // Dispatch delete action
        toast.success('Todo deleted successfully!'); // Show success toast
        setShowConfirmation(false);
      } catch (error) {
        toast.error('Failed to delete todo'); // Show failure toast
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setTodoToDelete(null);
  };

  return {
    todos,
    status,
    error,
    handleUpdate,
    handleDelete,
    showConfirmation,
    confirmDelete,
    cancelDelete,
  };
};
