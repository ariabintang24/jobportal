import React from "react";
import { color, motion } from "framer-motion";
import { Users, Briefcase, Target, TrendingUp } from "lucide-react";

const Analytic = () => {
  const stats = [
    {
      icon: Users,
      title: "Active Users",
      value: "2M",
      growth: "+12%",
      color: "blue",
    },
    {
      icon: Briefcase,
      title: "Companies",
      value: "100+",
      growth: "+12%",
      color: "blue",
    },
    {
      icon: TrendingUp,
      title: "Job Posted",
      value: "100+",
      growth: "+12%",
      color: "blue",
    },
    {
      icon: Target,
      title: "Successful Hires",
      value: "100+",
      growth: "+12%",
      color: "blue",
    },
  ];
  return (
    <section className="py-20 bg-white relative overflow-hidden ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Platform
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Analytic
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nihil
            placeat maxime tempora minus eius autem.
          </p>
        </motion.div>

        {/* Stats  Cards*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              key={index}
              viewport={{ once: true }}
              className="bg-white p-6 shadow-md rounded-2xl border border-gray-100 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
                  {stat.growth}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytic;
