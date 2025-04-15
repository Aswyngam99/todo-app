import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

describe('TodoItem', () => {
  const mockOnClick = jest.fn();

  test('renders todo item correctly', () => {
    render(<TodoItem id={1} title="Test Todo" completed={false} onClick={mockOnClick} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('❌')).toBeInTheDocument(); // Incomplete icon

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);  // Check if onClick is triggered
  });
});
