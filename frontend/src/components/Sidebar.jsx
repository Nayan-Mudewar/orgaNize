import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-400' : 'text-white hover:text-gray-300';
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">OrgaNize</h2>
      <nav className="space-y-4">
        <Link to="/dashboard" className={`block ${isActive('/dashboard')}`}>
          Dashboard
        </Link>
        <Link to="/profile" className={`block ${isActive('/profile')}`}>
          Profile
        </Link>
      </nav>
    </aside>
  );
}