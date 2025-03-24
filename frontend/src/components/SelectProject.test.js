import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectProject from './SelectProject';
import '@testing-library/jest-dom';

const projects = [
  { id: '1', name: 'Project One' },
  { id: '2', name: 'Project Two' },
];

describe('SelectProject Component - Edit Mode', () => {
  test('renders edit input and save/cancel buttons and calls onCancelEdit on cancel', () => {
    const Wrapper = () => {
      const [editMode, setEditMode] = useState(true);
      const [editedProjectName, setEditedProjectName] = useState("Project One");
      const [selectedProjectId, setSelectedProjectId] = useState("1");

      const onCancelEdit = jest.fn(() => {
        setEditMode(false);
      });

      return (
        <SelectProject
          projects={projects}
          selectedProjectId={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          onUpdateProjectName={jest.fn()}
          onCancelEdit={onCancelEdit}
          editMode={editMode}
          setEditMode={setEditMode}
          editedProjectName={editedProjectName}
          setEditedProjectName={setEditedProjectName}
        />
      );
    };

    render(<Wrapper />);
    
    expect(screen.getByLabelText(/Edit Project:/i)).toBeInTheDocument();
    
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('Project One');
    
    fireEvent.change(input, { target: { value: 'Updated Name' } });
    expect(input.value).toBe('Updated Name');
    
    const cancelButton = screen.getByTitle('Cancel');
    fireEvent.click(cancelButton);
    
    expect(screen.getByLabelText(/Select Project:/i)).toBeInTheDocument();
  });
});