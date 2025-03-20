import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

// GraphQL query to fetch projects with tasks
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
  
  // Retrieve the view preference from localStorage on mount
  useEffect(() => {
    const savedView = localStorage.getItem('taskView');
    if (savedView) {
      setView(savedView);
    }
  }, []);

  // Persist the view preference whenever it changes
  useEffect(() => {
    localStorage.setItem('taskView', view);
  }, [view]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleProjectChange = (e) => {
    setSelectedProjectId(e.target.value);
  };

  const selectedProject = data.projects.find(
    project => project.id === selectedProjectId
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Task Manager</h1>
      {/* Project Selector */}
      <div>
        <label htmlFor="projectSelect">Select Project: </label>
        <select id="projectSelect" onChange={handleProjectChange} value={selectedProjectId}>
          <option value="">-- Choose a project --</option>
          {data.projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* View Toggle Buttons */}
      <div style={{ margin: '20px 0' }}>
        <button onClick={() => setView('list')} style={{ marginRight: '10px' }}>
          List View
        </button>
        <button onClick={() => setView('grid')}>
          Grid View
        </button>
      </div>

      {/* Tasks Display */}
      {selectedProject ? (
        <div className={view === 'list' ? 'list-view' : 'grid-view'}>
          {selectedProject.tasks.map(task => (
            <div key={task.id} className="task-item">
              {task.name}
            </div>
          ))}
        </div>
      ) : (
        <p>Please select a project to view its tasks.</p>
      )}
    </div>
  );
}

export default App;