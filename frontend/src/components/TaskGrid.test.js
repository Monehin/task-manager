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

  test('renders tasks in a grid layout', () => {
    render(
      <TaskGrid
        tasks={tasks}
        editable={false}
        onDeleteTask={onDeleteTask}
        deletedTaskIds={[]}
      />
    );

    expect(screen.getByText(/Task One/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Two/i)).toBeInTheDocument();

    const gridContainer = screen.getByTestId('task-grid-container');
    expect(gridContainer).toHaveClass('grid');
  });

  test('does not render delete buttons when not editable', () => {
    render(
      <TaskGrid
        tasks={tasks}
        editable={false}
        onDeleteTask={onDeleteTask}
        deletedTaskIds={[]}
      />
    );
    expect(screen.queryByTitle('Delete Task')).not.toBeInTheDocument();
  });

  test('renders delete buttons when editable and calls callback on click', () => {
    render(
      <TaskGrid
        tasks={tasks}
        editable
        onDeleteTask={onDeleteTask}
        deletedTaskIds={[]}
      />
    );

    const deleteButtons = screen.getAllByTitle('Delete Task');
    expect(deleteButtons).toHaveLength(2);

    fireEvent.click(deleteButtons[0]);
    expect(onDeleteTask).toHaveBeenCalledWith('1');
  });

  test('applies faded style to tasks marked for deletion', () => {
    render(
      <TaskGrid
        tasks={tasks}
        editable
        onDeleteTask={onDeleteTask}
        deletedTaskIds={['1']}
      />
    );

    const taskOne = screen.getByText(/Task One/i).closest('div');
    const taskTwo = screen.getByText(/Task Two/i).closest('div');

    expect(taskOne).toHaveClass('opacity-50');
    expect(taskTwo).not.toHaveClass('opacity-50');
  });
});