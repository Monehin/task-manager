import React from 'react';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

const TaskList = React.memo(({ tasks, editable, onDeleteTask, deletedTaskIds = [] }) => {
  return (
    <motion.div
      className="space-y-4 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {tasks.map((task) => {
        const isDeleted = deletedTaskIds.includes(task.id);
        return (
          <motion.div
            key={task.id}
            whileHover={{ scale: isDeleted ? 1 : 1.03 }}
            className={`relative bg-white p-4 rounded-xl shadow-md ${isDeleted ? "opacity-50 pointer-events-none" : ""}`}
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
            <p className="text-lg text-gray-800">{task.name}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
});

export default TaskList;