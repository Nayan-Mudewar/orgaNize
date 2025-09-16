import React from "react";

export default function TaskCard({ task }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition space-y-2">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>

      <div className="text-sm text-gray-500">
        <p>Status: <span className="font-medium">{task.status}</span></p>
        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
        <p>Updated At: {new Date(task.updatedAt).toLocaleString()}</p>
      </div>

      <div className="text-sm mt-2">
        <p className="font-semibold">Created By:</p>
        <p>{task.createdBy?.name} ({task.createdBy?.email})</p>
      </div>

      <div className="text-sm mt-2">
        <p className="font-semibold">Assigned To:</p>
        <p>{task.assignedTo?.name} ({task.assignedTo?.email})</p>
      </div>
    </div>
  );
}
