import React, { useEffect } from 'react';
import { Edit2, Check, X } from 'lucide-react';

const SelectProject = ({
  projects,
  selectedProjectId,
  onChange,
  onUpdateProjectName,
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
    setEditedProjectName(currentProject ? currentProject.name : '');
    onCancelEdit(); 
  };

  return (
    <div className="max-w-3xl mx-auto mb-6">
      <label
        htmlFor={editMode ? "projectEditInput" : "projectSelect"}
        className="block mb-2 text-lg font-medium text-gray-700"
      >
        {editMode ? "Edit Project:" : "Select Project:"}
      </label>
      {editMode ? (
        <div className="flex gap-2">
          <input
            id="projectEditInput"
            type="text"
            value={editedProjectName}
            onChange={(e) => setEditedProjectName(e.target.value)}
            className="w-full p-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm text-base"
          />
          <button
            onClick={handleSave}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-colors"
            title="Save"
          >
            <Check size={20} />
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-700 transition-colors"
            title="Cancel"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <select
            id="projectSelect"
            value={selectedProjectId}
            onChange={onChange}
            className="w-full p-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm text-base"
          >
            <option value="">-- Choose a project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          {selectedProjectId && (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
              title="Edit Project"
            >
              <Edit2 size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectProject;