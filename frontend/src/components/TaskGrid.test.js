import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskGrid from './TaskGrid';
import '@testing-library/jest-dom';

const tasks = [
  { id: '1', name: 'Task One' },
  { id: '2', name: 'Task Two' },
];

describe('TaskGrid Component', () => {
  const onDeleteTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders tasks in grid and shows delete icons when editable', () => {
    render(<TaskGrid tasks={tasks} editable={true} onDeleteTask={onDeleteTask} deletedTaskIds={[]} />);
    
    expect(screen.getByText(/Task One/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Two/i)).toBeInTheDocument();

    const deleteButtons = screen.getAllByTitle('Delete Task');
    expect(deleteButtons).toHaveLength(2);

    fireEvent.click(deleteButtons[1]);
    expect(onDeleteTask).toHaveBeenCalledWith('2');
  });

  test('renders task faded when flagged for deletion', () => {
    render(<TaskGrid tasks={tasks} editable={true} onDeleteTask={onDeleteTask} deletedTaskIds={['2']} />);
    
    const taskTwoCard = screen.getByText(/Task Two/i).closest('div');
    expect(taskTwoCard).toHaveClass("opacity-50");
  });
});