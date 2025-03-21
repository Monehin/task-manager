import React from 'react';
import { motion } from 'framer-motion';

const TaskList = ({ tasks }) => (
  <motion.div
    className="space-y-4 max-w-3xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {tasks.map((task) => (
      <motion.div
        key={task.id}
        whileHover={{ scale: 1.03 }}
        className="bg-white p-4 rounded-xl shadow-md"
      >
        <p className="text-lg text-gray-800">{task.name}</p>
      </motion.div>
    ))}
  </motion.div>
);

export default TaskList;