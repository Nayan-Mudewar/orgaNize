import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <img src={logo} alt="OrgaNize Logo" className="w-16 h-16" />
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Orga<span className="text-blue-600">Nize</span>
        </h1>
      </div>

      {/* Tagline */}
      <p className="text-lg text-gray-600 max-w-md text-center mb-10">
        Streamline your tasks, boost productivity, and stay organized — all in one place.
      </p>

      {/* Call to Action */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition duration-200"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 rounded-xl border border-gray-300 text-gray-800 font-semibold hover:border-blue-600 hover:text-blue-600 transition duration-200"
        >
          Register
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-400">
        © {new Date().getFullYear()} OrgaNize. All rights reserved.
      </footer>
    </div>
  );
}
