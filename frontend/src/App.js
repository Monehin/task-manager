import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import SelectProject from './components/SelectProject';
import ViewToggle from './components/ViewToggle';
import Dashboard from './components/Dashboard';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      tasks {
        id
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [view, setView] = useState('list');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  // Retrieve saved view from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem('taskView');
    if (savedView) setView(savedView);
  }, []);

  // Save view to localStorage on change
  useEffect(() => {
    localStorage.setItem('taskView', view);
  }, [view]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  const handleProjectChange = (e) => setSelectedProjectId(e.target.value);
  const selectedProject = data.projects.find((project) => project.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 sm:p-10">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-800 text-center">Task Dashboard</h1>
      <SelectProject
        projects={data.projects}
        selectedProjectId={selectedProjectId}
        onChange={handleProjectChange}
      />
      <ViewToggle view={view} setView={setView} />
      <Dashboard project={selectedProject} view={view} />
    </div>
  );
}

export default App;