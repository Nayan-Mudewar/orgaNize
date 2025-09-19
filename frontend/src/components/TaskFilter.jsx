import React, { useState, useRef, useEffect } from "react";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


export default function TaskFilter({ name = "", onFiltered }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);
  const { token } = useAuth(); // get JWT token from your auth context


  const STATUS_MAP = {
    "All": null,
    "To do": "TODO",
    "In Progress": "IN_PROGRESS",
    "Completed": "DONE",
  };

  // close dropdown on clicking outside
  useEffect(() => {
    function handleDocClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  async function applyFilter(label) {
    setOpen(false);
    const statusValue = STATUS_MAP[label];
    setLoading(true);

    try {
      const params = {};
      if (statusValue) params.status = statusValue;
      
      if (name) params.name = name;

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL || ""}/api/tasks/filter`,
        {
          params,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      
      if (onFiltered) onFiltered(res.data);
    } catch (err) {
     
      if (err.response && err.response.status === 204) {
        if (onFiltered) onFiltered([]);
      } else {
        console.error("Task filter error:", err);
        
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:shadow-md focus:outline-none"
        aria-expanded={open}
      >
        <FiFilter className="w-5 h-5" />
        <span className="hidden sm:inline">Filter</span>
        <FiChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
          <ul className="divide-y">
            {["All", "To do", "In Progress", "Completed"].map((label) => (
              <li key={label}>
                <button
                  onClick={() => applyFilter(label)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          
          {loading && (
            <div className="px-3 py-2 text-sm text-gray-500">Loading…</div>
          )}
        </div>
      )}
    </div>
  );
}
