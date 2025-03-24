import React, { useEffect } from 'react';
import Select from 'react-select';
import { Edit2, Check, X, Trash2 } from 'lucide-react';

const SelectProject = ({
  projects,
  selectedProjectId,
  onChange,
  onUpdateProjectName,
  onDeleteProject,
  onCancelEdit,
  editMode,
  setEditMode,
  editedProjectName,
  setEditedProjectName,
}) => {
  const currentProject = projects.find((proj) => proj.id === selectedProjectId);

  useEffect(() => {
    if (currentProject) {
      setEditedProjectName(currentProject.name);
    }
  }, [currentProject, setEditedProjectName]);

  const handleSave = () => {
    if (onUpdateProjectName && currentProject) {
      onUpdateProjectName(currentProject.id, editedProjectName);
    }
    setEditMode(false);
  };

  const handleCancel = () => {
    // Revert to original name
    setEditedProjectName(currentProject ? currentProject.name : '');
    onCancelEdit();
  };

  const projectOptions = projects.map((project) => ({
    value: project.id,
    label: project.name,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '1rem',
      padding: '4px 8px',
      borderColor: '#d1d5db',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#2563eb',
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div className="max-w-3xl mx-auto mb-6">
      <label
        htmlFor={editMode ? 'projectEditInput' : 'projectSelect'}
        className="block mb-2 text-lg font-medium text-gray-700 text-center"
      >
        {editMode ? 'Edit Project:' : 'Select Project:'}
      </label>

      {editMode ? (
        <div className="flex flex-col items-center gap-2 ">
          <input
            id="projectEditInput"
            type="text"
            value={editedProjectName}
            onChange={(e) => setEditedProjectName(e.target.value)}
            className="w-full p-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm text-base"
          />
          <div className="flex flex-row gap-4 justify-center mt-2">
            <button
              onClick={handleSave}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-colors"
              title="Save"
            >
              <Check size={20} />
              <span className="ml-1">Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-700 transition-colors"
              title="Cancel"
            >
              <X size={20} />
              <span className="ml-1">Cancel</span>
            </button>
            <button
              onClick={() => onDeleteProject(currentProject.id)}
              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-colors"
              title="Delete Project"
            >
              <Trash2 size={20} />
              <span className="ml-1">Delete</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-center">
          <div className="w-full">
            {/* In NON-EDIT mode, the label references 'projectSelect' */}
            <Select
              data-testid="react-select-project"
              // IMPORTANT: use 'inputId' instead of 'id'
              inputId="projectSelect"
              options={projectOptions}
              value={projectOptions.find(
                (option) => option.value === selectedProjectId
              )}
              onChange={(selectedOption) =>
                onChange({ target: { value: selectedOption?.value || '' } })
              }
              placeholder="-- Choose a project --"
              styles={customStyles}
              isClearable
            />
          </div>
          {selectedProjectId && (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
              title="Edit Project"
            >
              <Edit2 size={20} />
              <span className="ml-1">Edit</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectProject;