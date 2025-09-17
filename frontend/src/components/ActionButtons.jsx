import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        aria-label="Edit task"
        onClick={onEdit}
        className="p-1.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
      >
        <FiEdit size={16} className="text-blue-600" />
      </button>

      <button
        type="button"
        aria-label="Delete task"
        onClick={onDelete}
        className="p-1.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors"
      >
        <FiTrash size={16} className="text-red-600" />
      </button>
    </div>
  );
}
