import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskList from './TaskList';
import TaskGrid from './TaskGrid';

const Dashboard = ({ project, view }) => {

  const tasks = React.useMemo(() => {
    return project ? project.tasks : [];
  }, [project]);

  if (!project) {
    return (
      <p className="text-center text-xl text-gray-500 mt-10">
        Please select a project to view tasks.
      </p>
    );
  }

  return (
      <AnimatePresence>
        {view === 'list' ? (
          <TaskList key="list" tasks={tasks} />
      ) : (
        <TaskGrid key="grid" tasks={tasks} />
      )}
    </AnimatePresence>
  );
};

export default Dashboard;