import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { GET_PROJECTS } from './App';

const projectsMock = [
  {
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
  },
];

describe('App Component Integration', () => {
  test('renders project dropdown, toggles edit mode, and displays tasks', async () => {
    render(
      <MockedProvider mocks={projectsMock} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByLabelText(/Select Project:/i)).toBeInTheDocument());

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveDisplayValue('-- Choose a project --');

    fireEvent.change(select, { target: { value: '1' } });
    expect(select.value).toBe('1');

    await waitFor(() => expect(screen.getByText(/Task One/i)).toBeInTheDocument());

    const editButton = screen.getByTitle('Edit Project');
    fireEvent.click(editButton);

    expect(screen.getByLabelText(/Edit Project:/i)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('Project One');
  });
});