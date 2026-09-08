import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../../context/useAuth";

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Carigawe</span>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              onClick={() => navigate("/find-jobs")}
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Find Jobs
            </a>
            <a
              onClick={() => {
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login",
                );
              }}
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              For employers
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user?.name}</span>

                <Link
                  to={
                    user?.role === "employer"
                      ? "/employer-dashboard"
                      : "/find-jobs"
                  }
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
