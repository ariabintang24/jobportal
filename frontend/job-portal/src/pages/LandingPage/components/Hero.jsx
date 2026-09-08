import { motion } from "framer-motion";
import { Search, ArrowRight, Users, Building2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../context/useAuth";

const Hero = () => {
  const {user, isAuthenticated} = useAuth
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: "Active Users", value: "100+" },
    { icon: Building2, label: "Companies", value: "100+" },
    { icon: TrendingUp, label: "Job Posted", value: "100+" },
  ];

  return (
    <section className="pt-24 pb-16 bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold leading-tight pt-10"
          >
            Find Your Dream Job or
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
              Perfect Hire
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-xl  text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
            ipsam reiciendis obcaecati at in aspernatur voluptates.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 text-lg rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-sm flex items-center space-x-2"
              onClick={() => navigate("/find-jobs")}
            >
              <Search className="w-5 h-5" />
              <span className="">Find Jobs</span>
              <ArrowRight className="w-5 h-5 group:hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              className="bg-white border-2 border-gray-300 text-gray-900 py-4 px-8 text-lg rounded-xl font-semibold hover:border-gray-300 transition-all duration-300 shadow-sm"
              onClick={() =>
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login",
                )
              }
            >
              Post a Job
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 * index * 0.2, duration: 0.8 }}
                className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-sm font-boldtext-gray-900">
                  {stat.value}
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Subtitle Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30" />
      </div>
    </section>
  );
};

export default Hero;
