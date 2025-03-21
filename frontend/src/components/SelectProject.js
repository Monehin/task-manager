import React from 'react';

const SelectProject = ({ projects, selectedProjectId, onChange }) => (
  <div className="max-w-3xl mx-auto mb-6">
    <label htmlFor="projectSelect" className="block mb-2 text-lg font-medium text-gray-700">
      Select Project:
    </label>
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
  </div>
);

export default SelectProject;