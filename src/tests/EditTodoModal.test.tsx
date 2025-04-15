import { render, screen, fireEvent } from '@testing-library/react';
import EditTodoModal from '../components/EditTodoModal';
import React from 'react';

describe('EditTodoModal', () => {
  const mockOnSave = jest.fn();
  const mockOnClose = jest.fn();
  const mockTodo = { id: 1, title: 'delectus aut autem', completed: false, userId: 1 };

  test('renders edit modal correctly', () => {
    render(<EditTodoModal todo={mockTodo} onSave={mockOnSave} onClose={mockOnClose} />);

    expect(screen.getByText('Edit Todo')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveValue(mockTodo.title);
    expect(screen.getByLabelText('Completed')).toBeChecked();
  });

  test('calls onSave with updated values', () => {
    render(<EditTodoModal todo={mockTodo} onSave={mockOnSave} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Todo' } });
    fireEvent.click(screen.getByText('Save'));

    expect(mockOnSave).toHaveBeenCalledWith({
      id: 1,
      title: 'Updated Todo',
      completed: false
    });
  });

  test('calls onClose when cancel button is clicked', () => {
    render(<EditTodoModal todo={mockTodo} onSave={mockOnSave} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
