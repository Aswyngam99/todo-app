import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem';
describe('TodoItem', function () {
    var mockOnClick = jest.fn();
    test('renders todo item correctly', function () {
        render(React.createElement(TodoItem, { id: 1, title: "Test Todo", completed: false, onClick: mockOnClick }));
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByText('❌')).toBeInTheDocument(); // Incomplete icon
        var editButton = screen.getByText('Edit');
        fireEvent.click(editButton);
        expect(mockOnClick).toHaveBeenCalledTimes(1); // Check if onClick is triggered
    });
});
