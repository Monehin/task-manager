import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

import App, { GET_PROJECTS, DELETE_PROJECT } from './App';

const initialProjectsMock = {
  request: {
    query: GET_PROJECTS,
  },
  result: {
    data: {
      projects: [
        {
          id: '1',
          name: 'Project One',
          tasks: [
            { id: '1', name: 'Task One' },
            { id: '2', name: 'Task Two' },
          ],
        },
        {
          id: '2',
          name: 'Project Two',
          tasks: [{ id: '3', name: 'Task Three' }],
        },
      ],
    },
  },
};

const refetchProjectsMock = {
  request: {
    query: GET_PROJECTS,
  },
  result: {
    data: {
      projects: [
        {
          id: '2',
          name: 'Project Two',
          tasks: [{ id: '3', name: 'Task Three' }],
        },
      ],
    },
  },
};

const deleteProjectMock = {
  request: {
    query: DELETE_PROJECT,
    variables: { input: { id: '1' } },
  },
  result: {
    data: {
      deleteProject: {
        project: { id: '1' },
      },
    },
  },
};

describe('App Component Integration', () => {
  test('renders react-select with placeholder', async () => {
    render(
      <MockedProvider mocks={[initialProjectsMock]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await screen.findByText('Select Project:');

    expect(screen.getByText('-- Choose a project --')).toBeInTheDocument();
  });

  test('selects a project and toggles edit mode', async () => {
    render(
      <MockedProvider mocks={[initialProjectsMock]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await screen.findByText('Select Project:');

    fireEvent.mouseDown(screen.getByText('-- Choose a project --'));

    fireEvent.click(screen.getByText('Project One'));

    await screen.findByText('Task One');
    expect(screen.getByText('Task Two')).toBeInTheDocument();

    const editButton = screen.getByTitle('Edit Project');
    fireEvent.click(editButton);

    await screen.findByText('Edit Project:');
    const input = screen.getByDisplayValue('Project One');
    expect(input).toBeInTheDocument();
  });

  test('marks a deleted task with opacity-50 in edit mode', async () => {
    render(
      <MockedProvider mocks={[initialProjectsMock]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await screen.findByText('Select Project:');
    
    fireEvent.mouseDown(screen.getByText('-- Choose a project --'));
    fireEvent.click(screen.getByText('Project One'));

    await screen.findByText('Task One');

    fireEvent.click(screen.getByTitle('Edit Project'));

    const deleteTaskButtons = await screen.findAllByTitle('Delete Task');
    fireEvent.click(deleteTaskButtons[0]);

    const taskOne = screen.getByText('Task One').closest('div');
    expect(taskOne).toHaveClass('opacity-50');
  });

  test('delete project refetches and clears selection', async () => {
    jest.spyOn(window, 'confirm').mockReturnValueOnce(true);

    render(
      <MockedProvider
        mocks={[initialProjectsMock, refetchProjectsMock, deleteProjectMock]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );

    await screen.findByText('Select Project:');

    fireEvent.mouseDown(screen.getByText('-- Choose a project --'));
    fireEvent.click(screen.getByText('Project One'));

    await screen.findByText('Task One');

    fireEvent.click(screen.getByTitle('Edit Project'));

    const deleteButton = screen.getByTitle('Delete Project');
    fireEvent.click(deleteButton);

    await screen.findByText('-- Choose a project --');

    window.confirm.mockRestore();
  });
});