import React from 'react';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

const TaskGrid = React.memo(({ tasks, editable, onDeleteTask, deletedTaskIds = [] }) => {
  return (
    <motion.div
      data-testid="task-grid-container" 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {tasks.map((task) => {
        const isDeleted = deletedTaskIds.includes(task.id);
        return (
          <motion.div
            key={task.id}
            whileHover={{ scale: isDeleted ? 1 : 1.05 }}
            className={`relative bg-white p-5 rounded-xl shadow-md flex items-center justify-center text-center ${
              isDeleted ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            {editable && !isDeleted && (
              <button
                onClick={() => onDeleteTask(task.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                title="Delete Task"
              >
                <XIcon size={16} />
              </button>
            )}
            <p className="text-base font-medium text-gray-700">{task.name}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
});

export default TaskGrid;