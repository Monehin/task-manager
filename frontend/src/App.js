import React, { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import SelectProject from './components/SelectProject';
import ViewToggle from './components/ViewToggle';
import Dashboard from './components/Dashboard';

export const GET_PROJECTS = gql`
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

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      project {
        id
        name
        tasks {
          id
          name
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data, refetch } = useQuery(GET_PROJECTS);
  const [updateProject, { loading: updating, error: updateError }] = useMutation(UPDATE_PROJECT);

  const [view, setView] = useState('list');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState('');
  const [deletedTaskIds, setDeletedTaskIds] = useState([]);

  useEffect(() => {
    const savedView = localStorage.getItem('taskView');
    if (savedView) setView(savedView);
  }, []);

  useEffect(() => {
    localStorage.setItem('taskView', view);
  }, [view]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  const handleProjectChange = (e) => {
    setSelectedProjectId(e.target.value);
    setEditMode(false); 
    setDeletedTaskIds([]); 
    const proj = data.projects.find((p) => p.id === e.target.value);
    setEditedProjectName(proj ? proj.name : '');
  };

  const handleUpdateProject = async (id, newName) => {
    try {
      await updateProject({
        variables: {
          input: {
            id,
            name: newName,
            deletedTaskIds,
          },
        },
      });
      setEditMode(false);
      setDeletedTaskIds([]);
      refetch();
    } catch (err) {
      console.error("Error updating project", err);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setDeletedTaskIds([]);
  };

  const handleDeleteTask = (taskId) => {
    setDeletedTaskIds((prev) => {
      if (!prev.includes(taskId)) {
        return [...prev, taskId];
      }
      return prev;
    });
  };

  const selectedProject = data.projects.find((project) => project.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 sm:p-10">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-800 text-center">
        Task Dashboard
      </h1>
      <SelectProject
        projects={data.projects}
        selectedProjectId={selectedProjectId}
        onChange={handleProjectChange}
        onUpdateProjectName={handleUpdateProject}
        onCancelEdit={handleCancelEdit}
        editMode={editMode}
        setEditMode={setEditMode}
        editedProjectName={editedProjectName}
        setEditedProjectName={setEditedProjectName}
      />
      <ViewToggle view={view} setView={setView} />
      <Dashboard
        project={selectedProject}
        view={view}
        editable={editMode}
        onDeleteTask={handleDeleteTask}
        deletedTaskIds={deletedTaskIds}
      />
      {updateError && <p className="text-center text-red-600 mt-4">{updateError.message}</p>}
    </div>
  );
}

export default App;