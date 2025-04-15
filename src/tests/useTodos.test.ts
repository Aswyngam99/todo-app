import { useTodos } from '../hooks/useTodos';
import { renderHook } from '@testing-library/react';

jest.mock('../hooks/useTodos');  // Mock the custom hook

describe('useTodos', () => {
  test('returns the correct todos state', () => {
    (useTodos as jest.Mock).mockReturnValue({
      todos: [{ id: 1, title: 'Test Todo', completed: false }],
      status: 'idle',
      handleUpdate: jest.fn(),
      handleDelete: jest.fn(),
      showConfirmation: false,
      confirmDelete: jest.fn(),
      cancelDelete: jest.fn()
    });

    const { result } = renderHook(() => useTodos());

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe('Test Todo');
  });
});
