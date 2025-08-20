import React from "react";
import { Phone, Mail } from "lucide-react";
import Matrimonyshop from "../assets/Matrimonyshop.jpg";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have a question about features, pricing, feedback, or anything else,
            our team is ready to answer!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Contact Information */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-10 h-[500px] flex flex-col justify-center space-y-10">
              <h2 className="text-3xl font-semibold text-gray-800">Get in Touch</h2>

              {/* Phone */}
              <div className="flex items-start space-x-5">
                <div className="p-3 bg-red-100 rounded-lg text-red-700">
                  <Phone className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">+91 9876543210</p>
                  <p className="text-sm text-gray-500 mt-1">Call us anytime</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-5">
                <div className="p-3 bg-red-100 rounded-lg text-red-700">
                  <Mail className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">support@matrimony.com</p>
                  <p className="text-sm text-gray-500 mt-1">Send us an email</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-5">
                <div className="p-3 bg-red-100 rounded-lg text-red-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    123 Matrimony Street, Chennai, Tamil Nadu, India
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Visit us during business hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="rounded-xl shadow-lg overflow-hidden h-[500px]">
            <img
              src={Matrimonyshop}
              alt="Our Location"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

