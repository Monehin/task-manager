import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskList from './TaskList';
import TaskGrid from './TaskGrid';

const Dashboard = ({ project, view, editable, onDeleteTask, deletedTaskIds = [] }) => {
  if (!project) {
    return (
      <p className="text-center text-xl text-gray-500 mt-10">
        Please select a project to view tasks.
      </p>
    );
  }

  const tasks = project.tasks || [];

  return (
    <AnimatePresence mode="wait">
      {view === 'list' ? (
        <TaskList
          key="list-view"
          tasks={tasks}
          editable={editable}
          onDeleteTask={onDeleteTask}
          deletedTaskIds={deletedTaskIds}
        />
      ) : (
        <TaskGrid
          key="grid-view"
          tasks={tasks}
          editable={editable}
          onDeleteTask={onDeleteTask}
          deletedTaskIds={deletedTaskIds}
        />
      )}
    </AnimatePresence>
  );
};

export default Dashboard;