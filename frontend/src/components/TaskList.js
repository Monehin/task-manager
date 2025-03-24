import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

const TaskList = memo(({ tasks, editable, onDeleteTask, deletedTaskIds = [] }) => {
  return (
    <motion.div
      data-testid="task-list"
      className="flex flex-col gap-4 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {tasks.map((task) => {
        const isDeleted = deletedTaskIds.includes(task.id);
        return (
          <motion.div
            key={task.id}
            data-testid={`task-${task.id}`}
            whileHover={{ scale: isDeleted ? 1 : 1.05 }}
            className={`relative bg-white p-5 rounded-xl shadow-md flex items-center justify-between ${
              isDeleted ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <p className="text-base font-medium text-gray-700">{task.name}</p>

            {editable && !isDeleted && (
              <button
                onClick={() => onDeleteTask(task.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                title="Delete Task"
              >
                <XIcon size={16} />
              </button>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
});

export default TaskList;