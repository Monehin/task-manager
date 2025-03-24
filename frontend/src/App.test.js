import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App, { GET_PROJECTS, DELETE_PROJECT } from './App';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

// Initial mock for GET_PROJECTS: returns two projects.
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
          tasks: [
            { id: '3', name: 'Task Three' },
          ],
        },
      ],
    },
  },
};

// Second mock for GET_PROJECTS (after deletion of project "1").
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
          tasks: [
            { id: '3', name: 'Task Three' },
          ],
        },
      ],
    },
  },
};

// Mock for DELETE_PROJECT mutation.
const deleteProjectMock = {
  request: {
    query: DELETE_PROJECT,
    variables: { input: { id: '1' } },
  },
  result: {
    data: {
      deleteProject: {
        project: { id: '1' },
        errors: [],
      },
    },
  },
};

describe('App Component Integration', () => {
  test('renders project dropdown', async () => {
    render(
      <MockedProvider mocks={[initialProjectsMock]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // Wait for the projects to load.
    await screen.findByLabelText(/Select Project:/i);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveDisplayValue('-- Choose a project --');
  });

  test('toggles edit mode', async () => {
    render(
      <MockedProvider mocks={[initialProjectsMock]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // Wait for the dropdown to load.
    await screen.findByLabelText(/Select Project:/i);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    expect(select.value).toBe('1');

    // Wait for tasks to render.
    await screen.findByText(/Task One/i);

    // Edit button should be visible.
    const editButton = await screen.findByTitle('Edit Project');
    fireEvent.click(editButton);

    // In edit mode, the label should read "Edit Project:" and input should appear.
    await screen.findByLabelText(/Edit Project:/i);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('Project One');
  });

  test('displays tasks', async () => {
    render(
      <MockedProvider mocks={[initialProjectsMock]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // Select project "Project One"
    await screen.findByLabelText(/Select Project:/i);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    expect(select.value).toBe('1');

    // Wait for tasks to render.
    await screen.findByText(/Task One/i);
    expect(screen.getByText(/Task Two/i)).toBeInTheDocument();
  });

  test('delete task marks task as disabled in edit mode', async () => {
    render(
      <MockedProvider mocks={[initialProjectsMock]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await screen.findByLabelText(/Select Project:/i);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    expect(select.value).toBe('1');

    const editButton = await screen.findByTitle('Edit Project');
    fireEvent.click(editButton);

    const deleteTaskButtons = await screen.findAllByTitle('Delete Task');
    expect(deleteTaskButtons.length).toBeGreaterThan(0);

    fireEvent.click(deleteTaskButtons[0]);

    const taskOneCard = screen.getByText(/Task One/i).closest('div');
    expect(taskOneCard).toHaveClass('opacity-50');
  });

  test('delete project clears selection and turns off edit mode', async () => {
    const combinedMocks = [initialProjectsMock, refetchProjectsMock, deleteProjectMock];

    jest.spyOn(window, 'confirm').mockReturnValueOnce(true);

    render(
      <MockedProvider mocks={combinedMocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // Wait for projects to load.
    await screen.findByLabelText(/Select Project:/i);
    const select = await screen.findByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    expect(select.value).toBe('1');

    const editButton = await screen.findByTitle('Edit Project');
    fireEvent.click(editButton);

    const deleteProjectButton = await screen.findByTitle('Delete Project');
    fireEvent.click(deleteProjectButton);

    const updatedSelect = await screen.findByRole('combobox', {});
    expect(updatedSelect.value).toBe('');
    expect(screen.getByLabelText(/Select Project:/i)).toBeInTheDocument();

    window.confirm.mockRestore();
  });
});