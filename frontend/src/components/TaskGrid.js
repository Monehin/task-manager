import React from 'react';
import { motion } from 'framer-motion';

const TaskGrid = React.memo(({ tasks }) => {
  return (
    <motion.div
      className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6 max-w-5xl mx-auto md:grid-cols-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-5 rounded-xl shadow-md flex items-center justify-center text-center"
        >
          <p className="text-base font-medium text-gray-700">{task.name}</p>
        </motion.div>
      ))}
    </motion.div>
  );
});

export default TaskGrid;