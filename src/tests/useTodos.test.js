import { useTodos } from '../hooks/useTodos';
import { renderHook } from '@testing-library/react';
jest.mock('../hooks/useTodos'); // Mock the custom hook
describe('useTodos', function () {
    test('returns the correct todos state', function () {
        useTodos.mockReturnValue({
            todos: [{ id: 1, title: 'Test Todo', completed: false }],
            status: 'idle',
            handleUpdate: jest.fn(),
            handleDelete: jest.fn(),
            showConfirmation: false,
            confirmDelete: jest.fn(),
            cancelDelete: jest.fn()
        });
        var result = renderHook(function () { return useTodos(); }).result;
        expect(result.current.todos).toHaveLength(1);
        expect(result.current.todos[0].title).toBe('Test Todo');
    });
});
