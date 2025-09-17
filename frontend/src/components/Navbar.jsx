import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";
export default function Navbar({ variant = "default" }) {
  const links =
    variant === "auth"
      ? [{ to: "/", text: "Back to Home", className: "text-gray-600 hover:text-blue-600" }]
      : [
          { to: "/login", text: "Login", className: "text-gray-600 hover:text-blue-600" },
          {
            to: "/register",
            text: "Sign Up",
            className: "px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition",
          },
        ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="OrgaNize Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-800">
              Orga<span className="text-blue-600">Nize</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center space-x-4">
            {links.map(({ to, text, className }) => (
              <Link key={to} to={to} className={className}>
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
