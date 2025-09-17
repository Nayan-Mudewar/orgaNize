import React from 'react';

export default function TaskEditForm({ form, setForm, onCancel, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4 relative z-20"
    >
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        maxLength={50}
        className="border rounded px-2 py-1 w-full"
      />
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        maxLength={200}
        className="border rounded px-2 py-1 w-full"
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
      <input
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
          Update
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </form>
  );
}
