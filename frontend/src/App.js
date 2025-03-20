import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { motion, AnimatePresence } from 'framer-motion';
import { List, Grid } from 'lucide-react';

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

  useEffect(() => {
    const savedView = localStorage.getItem('taskView');
    if (savedView) setView(savedView);
  }, []);

  useEffect(() => {
    localStorage.setItem('taskView', view);
  }, [view]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );

  if (error) return <p className="text-center text-red-600 mt-10">Error: {error.message}</p>;

  const handleProjectChange = (e) => setSelectedProjectId(e.target.value);
  const selectedProject = data.projects.find((project) => project.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 sm:p-10">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-800 text-center">Task Dashboard</h1>

      <div className="max-w-3xl mx-auto mb-6">
        <label htmlFor="projectSelect" className="block mb-2 text-lg font-medium text-gray-700">Select Project:</label>
        <select
          id="projectSelect"
          value={selectedProjectId}
          onChange={handleProjectChange}
          className="w-full p-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm text-base"
        >
          <option value="">-- Choose a project --</option>
          {data.projects.map((project) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setView('list')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all border ${view === 'list' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'}`}
        >
          <List size={20} /> List
        </button>
        <button
          onClick={() => setView('grid')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all border ${view === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'}`}
        >
          <Grid size={20} /> Grid
        </button>
      </div>

      {selectedProject ? (
        <AnimatePresence>
          {view === 'list' ? (
            <motion.div
              className="space-y-4 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {selectedProject.tasks.map((task) => (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-4 rounded-xl shadow-md"
                >
                  <p className="text-lg text-gray-800">{task.name}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {selectedProject.tasks.map((task) => (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-5 rounded-xl shadow-md flex items-center justify-center text-center"
                >
                  <p className="text-base font-medium text-gray-700">{task.name}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <p className="text-center text-xl text-gray-500 mt-10">Please select a project to view tasks.</p>
      )}
    </div>
  );
}

export default App;
