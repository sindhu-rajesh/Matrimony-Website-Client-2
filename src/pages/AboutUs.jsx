import React from "react";
import { FaHeart, FaShieldAlt, FaLock, FaUsers } from "react-icons/fa";
import profile1 from "../assets/profile1.jpg"; // Adjust extension as needed
import missionImage from "../assets/aboutimage.jpg"; // Ensure this file exists in your assets folder

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      {/* About Us Header */}
      <div className="max-w-6xl mx-auto">

        <section className="py-16 px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Welcome to <span className="font-semibold text-purple-700">Matrimony</span>, a trusted platform
                connecting hearts and helping individuals find their perfect life partners. Whether you're searching for
                love, companionship, or a shared future, we're here to make your journey secure, respectful, and
                meaningful.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Matchmaking with Purpose */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-black text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Matchmaking with Purpose</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We focus on genuine biodatas with real intentions for lifelong partnerships.
                </p>
              </div>

              {/* Verified Users */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="text-black text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Verified Users</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our platform ensures user authentication and optional premium verification for added trust.
                </p>
              </div>

              {/* Privacy First */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLock className="text-black text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Privacy First</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your data and contact information are protected and visible only to premium or approved users.
                </p>
              </div>

              {/* Community Support */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-black text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Community Support</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We provide tools and dashboards to help users manage requests, favorites, and success stories.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 mb-12">
          {/* Left Column - Name and List */}
          <div className="space-y-8">
            {/* Name Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Name:</h2>
              <p className="text-xl text-rose-700 font-medium">MatrimonyConnect</p>
            </div>

            {/* List of Our Services */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">List of Our:</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-rose-600 mr-3 mt-1">★</span>
                  <span>Verified Profile Matching</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 mr-3 mt-1">★</span>
                  <span>Personalized Recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 mr-3 mt-1">★</span>
                  <span>Privacy & Security Protection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 mr-3 mt-1">★</span>
                  <span>24/7 Customer Support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 mr-3 mt-1">★</span>
                  <span>Success Story Guidance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Photos */}
          <div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-lg overflow-hidden bg-gray-200 shadow-md">
                <img
                  src={profile1}
                  alt="MatrimonyConnect team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                Matrimony Match was created to bring together like-minded individuals who value culture, integrity, and
                commitment. We aim to make matrimonial matchmaking respectful, modern, and emotionally fulfilling — with
                the help of secure technology and a user-first experience.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center">
              <img
                src={missionImage}
                alt="Our Mission"
                className="rounded-lg shadow-md max-w-md w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


