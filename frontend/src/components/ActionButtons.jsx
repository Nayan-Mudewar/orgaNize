import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="absolute top-2 right-2 flex space-x-2 z-10">
      <button
        type="button"
        aria-label="Edit task"
        onClick={onEdit}
        className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <FiEdit size={18} className="text-blue-600" />
      </button>

      <button
        type="button"
        aria-label="Delete task"
        onClick={onDelete}
        className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-200"
      >
        <FiTrash size={18} className="text-red-600" />
      </button>
    </div>
  );
}
