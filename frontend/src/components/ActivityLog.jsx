import React, { useEffect, useRef, useState } from "react";
import { FiActivity, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


export default function ActivityLog() {
  const { token } = useAuth();
  const [open, setOpen] = useState(false); // dropdown
  const [modalOpen, setModalOpen] = useState(false); // full modal
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Helper to normalise backend responses (array OR Spring Page)
  function extractList(payload) {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.content)) return payload.content;
    return [];
  }

  // Fetch recent (small list) when dropdown opens
  async function fetchRecent() {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/activity-log/me`,
        {
           
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setLogs(extractList(res.data));
    } catch (err) {
      console.error("Failed to load recent activity:", err);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }

  // When dropdown opens -> fetch recent
  useEffect(() => {
    if (open) fetchRecent();
  }, [open]);

  

  // UI render
  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg hover:shadow-sm"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <FiActivity className="w-5 h-5" />
        <span className="hidden md:inline">Activity</span>
        <FiChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <div className="text-sm font-semibold">Recent activity</div>
          </div>

          <div className="max-h-64 overflow-auto">
            {loading && <div className="p-3 text-sm text-gray-500">Loading…</div>}

            {!loading && logs.length === 0 && (
              <div className="p-3 text-sm text-gray-500">No recent activity</div>
            )}

            {!loading &&
              logs.map((log) => (
                <div key={log.id} className="p-3 border-b last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      {log.actionType} <span className="text-gray-500">· {log.entityName}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {log.timestamp ? new Date(log.timestamp).toLocaleString() : ""}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mt-1 truncate">{log.details}</div>
                </div>
              ))}
          </div>
        </div>
      )}

      
    </div>
  );
}
