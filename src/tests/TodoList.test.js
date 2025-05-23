import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';
import { useTodos } from '../hooks/useTodos';
jest.mock('../hooks/useTodos'); // Mock the custom hook
describe('TodoList Component', function () {
    var mockTodos = [
        { id: 1, title: 'Test Todo 1', completed: false },
        { id: 2, title: 'Test Todo 2', completed: true },
    ];
    beforeEach(function () {
        // Mocking the return value of useTodos hook
        useTodos.mockReturnValue({
            todos: mockTodos,
            handleDelete: jest.fn(),
            handleUpdate: jest.fn(),
            handleCreate: jest.fn(),
            showConfirmation: false,
            confirmDelete: jest.fn(),
            cancelDelete: jest.fn(),
        });
    });
    it('renders todo items correctly', function () {
        render(React.createElement(TodoList, null));
        // Ensure both todos are displayed
        expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    });
    it('calls the delete function when delete button is clicked', function () {
        render(React.createElement(TodoList, null));
        var deleteButton = screen.getAllByRole('button', { name: /delete/i })[0]; // Get the first delete button
        fireEvent.click(deleteButton);
        // Check if delete function was called
        expect(useTodos().handleDelete).toHaveBeenCalledWith(1);
    });
    // Simulating API failure or empty state
    test('shows loading state while fetching todos', function () {
        useTodos.mockReturnValue({
            todos: [],
            status: 'loading',
            handleUpdate: jest.fn(),
            handleDelete: jest.fn(),
            showConfirmation: false,
            confirmDelete: jest.fn(),
            cancelDelete: jest.fn()
        });
        render(React.createElement(TodoList, null));
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
    test('handles error state when fetching todos fails', function () {
        useTodos.mockReturnValue({
            todos: [],
            status: 'error',
            handleUpdate: jest.fn(),
            handleDelete: jest.fn(),
            showConfirmation: false,
            confirmDelete: jest.fn(),
            cancelDelete: jest.fn()
        });
        render(React.createElement(TodoList, null));
        expect(screen.getByText('Error loading todos')).toBeInTheDocument();
    });
});
