import { FiCheckCircle, FiClock, FiUsers } from 'react-icons/fi';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; 

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
      {/* ✅ Use Navbar with default variant to show Login / Sign Up */}
      <Navbar variant="default" />

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
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

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {features.map(({ icon, title, description }, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition">
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
