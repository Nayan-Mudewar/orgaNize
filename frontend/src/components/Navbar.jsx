import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ variant = "default" }) {
    const [isOpen, setIsOpen] = useState(false);

    const authLinks = [
        { to: "/login", text: "Login", className: "text-gray-600 hover:text-blue-600" },
        { 
            to: "/register", 
            text: "Sign Up", 
            className: "px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition" 
        }
    ];

    const simpleLinks = [
        { 
            to: "/", 
            text: "Back to Home", 
            className: "text-gray-600 hover:text-blue-600" 
        }
    ];

    const links = variant === "auth" ? simpleLinks : authLinks;

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Link to="/">
                            <img src="/assets/logo.png" alt="OrgaNize Logo" className="w-8 h-8" />
                        </Link>
                        <span className="text-xl font-bold text-gray-800">
                            Orga<span className="text-blue-600">Nize</span>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className={link.className}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-blue-600"
                        >
                            <span className="sr-only">Open menu</span>
                            {!isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className={`block ${link.className}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}