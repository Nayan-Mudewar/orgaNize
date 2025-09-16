import { Link } from "react-router-dom";
import logo from "./../../public/assets/logo.png";
import { FiCheckCircle, FiClock, FiUsers } from 'react-icons/fi'; // Install react-icons if not already installed
import Footer from "../components/Footer";
export default function Welcome() {
  const features = [
    {
      icon: <FiCheckCircle className="w-6 h-6 text-blue-500" />,
      title: "Task Management",
      description: "Organize and prioritize your tasks efficiently"
    },
    {
      icon: <FiUsers className="w-6 h-6 text-blue-500" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team"
    },
    {
      icon: <FiClock className="w-6 h-6 text-blue-500" />,
      title: "Time Tracking",
      description: "Monitor progress and meet deadlines"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="OrgaNize Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-800">
                Orga<span className="text-blue-600">Nize</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-6">
              Organize Your Work,<br />
              <span className="text-blue-600">Amplify Your Success</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10">
              Experience seamless task management and team collaboration with OrgaNize. 
              Your all-in-one solution for enhanced productivity and organization.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
      
    </div>
  );
}
