import React from "react";
import { Link } from "react-router";
import { FaHeart } from "react-icons/fa";
import weddingAnimation from "../../../assets/Lottie/Wedding.json";
import Lottie from "lottie-react";

const UserHome = () => {
  return (
    <div>
      <title>Dashboard || Home</title>

      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl bg-white rounded-2xl shadow-xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-rose-700 mb-4">
            Welcome to Your Matrimony Dashboard 💕
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-8">
            Thank you for choosing our platform to find your life partner.
            Explore verified biodatas and take the first step towards your
            forever.
          </p>

          <div>
            <Lottie animationData={weddingAnimation} loop={true} />
          </div>

          <Link to="/biodatas">
            <button className="bg-rose-700 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg font-semibold flex items-center gap-2 mx-auto transition-all duration-300">
              <FaHeart /> Explore Biodata
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
