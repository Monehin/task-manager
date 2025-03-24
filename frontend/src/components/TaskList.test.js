import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';
import '@testing-library/jest-dom';

const tasks = [
  { id: '1', name: 'Task One' },
  { id: '2', name: 'Task Two' },
];

describe('TaskList Component', () => {
  const onDeleteTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders tasks without delete icon when not editable', () => {
    render(<TaskList tasks={tasks} editable={false} onDeleteTask={onDeleteTask} deletedTaskIds={[]} />);
    
    expect(screen.getByText(/Task One/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Two/i)).toBeInTheDocument();

    expect(screen.queryByTitle('Delete Task')).not.toBeInTheDocument();
  });

  test('renders delete icons when editable and calls callback', () => {
    render(<TaskList tasks={tasks} editable={true} onDeleteTask={onDeleteTask} deletedTaskIds={[]} />);

    const deleteButtons = screen.getAllByTitle('Delete Task');
    expect(deleteButtons).toHaveLength(2);

    fireEvent.click(deleteButtons[0]);
    expect(onDeleteTask).toHaveBeenCalledWith('1');
  });

  test('renders task with faded style when flagged for deletion', () => {
    render(<TaskList tasks={tasks} editable={true} onDeleteTask={onDeleteTask} deletedTaskIds={['1']} />);
    
    const taskOneCard = screen.getByText(/Task One/i).closest('div');
    expect(taskOneCard).toHaveClass("opacity-50");
  });
});