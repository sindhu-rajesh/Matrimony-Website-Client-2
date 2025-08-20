import React from "react";
import { FaUserPlus, FaComments, FaHeart } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus size={48} className="text-pink-600 mx-auto mb-4" />,
      title: "Register",
      description: "Create your profile in minutes.",
    },
    {
      id: 2,
      icon: <FaComments size={48} className="text-pink-600 mx-auto mb-4" />,
      title: "Search & Connect",
      description: "Find and chat with your perfect match.",
    },
    {
      id: 3,
      icon: <FaHeart size={48} className="text-pink-600 mx-auto mb-4" />,
      title: "Meet & Marry",
      description: "Start your new life.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-12">How It Works</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {steps.map(({ id, icon, title, description }) => (
          <div key={id} className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            {icon}
            <h3 className="font-semibold text-xl mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
