import React from 'react';
import { List, Grid } from 'lucide-react';

const ViewToggle = ({ view, setView }) => (
  <div className="flex justify-center gap-4 mb-2">
    <button
      onClick={() => setView('list')}
      className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all border ${
        view === 'list' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'
      }`}
    >
      <List size={20} /> List
    </button>
    <button
      onClick={() => setView('grid')}
      className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all border ${
        view === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'
      }`}
    >
      <Grid size={20} /> Grid
    </button>
  </div>
);

export default ViewToggle;