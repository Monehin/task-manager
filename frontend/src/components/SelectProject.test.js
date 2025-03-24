import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectProject from './SelectProject';

const mockProjects = [
  { id: '1', name: 'Project One' },
  { id: '2', name: 'Project Two' },
];

describe('SelectProject Component', () => {
  test('renders "Select Project:" label in non-edit mode with no selected project', () => {
    render(
      <SelectProject
        projects={mockProjects}
        selectedProjectId=""           // <--- no project selected
        onChange={jest.fn()}
        onUpdateProjectName={jest.fn()}
        onDeleteProject={jest.fn()}
        onCancelEdit={jest.fn()}
        editMode={false}
        setEditMode={jest.fn()}
        editedProjectName=""
        setEditedProjectName={jest.fn()}
      />
    );
  
    expect(screen.getByLabelText(/Select Project:/i)).toBeInTheDocument();
  
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  
    expect(screen.getByText('-- Choose a project --')).toBeInTheDocument();
  });

  test('renders "Edit Project:" label in edit mode and displays input with current name', () => {

    render(
      <SelectProject
        projects={mockProjects}
        selectedProjectId="1"
        onChange={jest.fn()}
        onUpdateProjectName={jest.fn()}
        onDeleteProject={jest.fn()}
        onCancelEdit={jest.fn()}
        editMode={true}
        setEditMode={jest.fn()}
        editedProjectName="Project One"
        setEditedProjectName={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/Edit Project:/i)).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Project One');
  });

  test('clicking Cancel calls onCancelEdit and switches back to "Select Project:"', () => {

    const onCancelEditMock = jest.fn();

    function Wrapper() {
      const [editMode, setEditMode] = useState(true);
      const [editedName, setEditedName] = useState('Project One');
      return (
        <SelectProject
          projects={mockProjects}
          selectedProjectId="1"
          onChange={jest.fn()}
          onUpdateProjectName={jest.fn()}
          onDeleteProject={jest.fn()}
          onCancelEdit={() => {
            onCancelEditMock();
            setEditMode(false); 
          }}
          editMode={editMode}
          setEditMode={setEditMode}
          editedProjectName={editedName}
          setEditedProjectName={setEditedName}
        />
      );
    }

    render(<Wrapper />);

    expect(screen.getByLabelText(/Edit Project:/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Cancel'));

    expect(onCancelEditMock).toHaveBeenCalled();

    expect(screen.getByLabelText(/Select Project:/i)).toBeInTheDocument();
  });

  test('clicking Save calls onUpdateProjectName with current input value', () => {
    const onUpdateProjectNameMock = jest.fn();

    function Wrapper() {
      const [editMode, setEditMode] = useState(true);
      const [editedName, setEditedName] = useState('Project One');
      return (
        <SelectProject
          projects={mockProjects}
          selectedProjectId="1"
          onChange={jest.fn()}
          onUpdateProjectName={onUpdateProjectNameMock}
          onDeleteProject={jest.fn()}
          onCancelEdit={jest.fn()}
          editMode={editMode}
          setEditMode={setEditMode}
          editedProjectName={editedName}
          setEditedProjectName={setEditedName}
        />
      );
    }

    render(<Wrapper />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Updated Project Name' } });
    expect(input).toHaveValue('Updated Project Name');

    fireEvent.click(screen.getByTitle('Save'));

    expect(onUpdateProjectNameMock).toHaveBeenCalledWith('1', 'Updated Project Name');
  });

  test('clicking Delete calls onDeleteProject', () => {
    const onDeleteProjectMock = jest.fn();

    render(
      <SelectProject
        projects={mockProjects}
        selectedProjectId="1"
        onChange={jest.fn()}
        onUpdateProjectName={jest.fn()}
        onDeleteProject={onDeleteProjectMock}
        onCancelEdit={jest.fn()}
        editMode={true}
        setEditMode={jest.fn()}
        editedProjectName="Project One"
        setEditedProjectName={jest.fn()}
      />
    );

    const deleteButton = screen.getByTitle('Delete Project');
    fireEvent.click(deleteButton);

    expect(onDeleteProjectMock).toHaveBeenCalledWith('1');
  });
});