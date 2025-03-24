import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import '@testing-library/jest-dom';

const project = {
  id: '1',
  name: 'Project One',
  tasks: [
    { id: '1', name: 'Task One' },
    { id: '2', name: 'Task Two' },
    { id: '3', name: 'Task Three' },
  ],
};

describe('Dashboard Component', () => {
  test('displays message when no project is selected', () => {
    render(<Dashboard project={null} view="list" editable={false} />);
    expect(
      screen.getByText(/Please select a project to view tasks./i)
    ).toBeInTheDocument();
  });

  test('renders tasks using TaskList when view is list', () => {
    render(<Dashboard project={project} view="list" editable={false} />);
    expect(screen.getByText(/Task One/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Two/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Three/i)).toBeInTheDocument();
  });

  test('renders tasks using TaskGrid when view is grid', () => {
    render(<Dashboard project={project} view="grid" editable={false} />);
    expect(screen.getByText(/Task One/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Two/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Three/i)).toBeInTheDocument();
  });

  test('applies disabled styling to tasks flagged for deletion', () => {
    render(
      <Dashboard
        project={project}
        view="list"
        editable={true}
        onDeleteTask={() => {}}
        deletedTaskIds={['1']}
      />
    );

    const taskOneContainer = screen.getByText(/Task One/i).closest('div');
    expect(taskOneContainer).toHaveClass('opacity-50');
  });
});