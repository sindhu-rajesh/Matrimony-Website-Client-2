import React from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

export default function QuickRegisterButtons() {
  return (
    <>
      {/* Container for fixed positioning */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/911234567890?text=I%20want%20to%20register"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
          aria-label="Register via WhatsApp"
        >
          <FaWhatsapp className="text-2xl" />
        </a>

        {/* Floating Phone Call Button */}
        <a
          href="tel:+911234567890"
          className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
          aria-label="Register via Phone Call"
        >
          <FaPhone className="text-2xl" />
        </a>
      </div>
    </>
  );
}
