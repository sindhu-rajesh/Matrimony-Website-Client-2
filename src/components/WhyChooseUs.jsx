import React from "react";
import { FaUserShield, FaSearch, FaLock, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaUserShield size={40} className="text-pink-600 mx-auto mb-4" />,
      title: "Verified Profiles",
      description: "Only genuine and verified members for your safety.",
    },
    {
      id: 2,
      icon: <FaSearch size={40} className="text-pink-600 mx-auto mb-4" />,
      title: "Advanced Matchmaking",
      description: "Smart algorithms to find your perfect match.",
    },
    {
      id: 3,
      icon: <FaLock size={40} className="text-pink-600 mx-auto mb-4" />,
      title: "Privacy & Security",
      description: "Your data is protected with robust security measures.",
    },
    {
      id: 4,
      icon: <FaHeadset size={40} className="text-pink-600 mx-auto mb-4" />,
      title: "24/7 Support",
      description: "We are here for you anytime, any day.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6">
        {features.map(({ id, icon, title, description }) => (
          <div key={id} className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition">
            {icon}
            <h3 className="font-semibold text-xl mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
