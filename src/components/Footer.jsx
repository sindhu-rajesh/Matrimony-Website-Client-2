import React from "react";
import logo from "../assets/Matrimonylogo.jpg";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 1st Column: Logo and Matrimony side-by-side */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain rounded" />
          <h3 className="text-2xl font-semibold">Matrimony</h3>
        </div>

        {/* 2nd Column: Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-sm">
            123, Anna Salai,<br />
            Chennai, TN 600001<br />
            Email: support@matrimony.com<br />
            Phone: +91-9876543210
          </p>
        </div>

        {/* 3rd Column: Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/about" className="hover:underline">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">Contact</a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* 4th Column: Live Location Map */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Live Location</h4>
          <div className="w-full h-40 rounded overflow-hidden shadow-lg">
            <iframe
              title="Live Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.615465541663!2d80.26632671470882!3d13.082680390822857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267c35de134df%3A0xfae11e228763ecb3!2sAnna%20Salai%2C%20Chennai!5e0!3m2!1sen!2sin!4v1692448794000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 text-gray-500 text-xs">
        All Rights Reserved ©{' '}
        <a
          href="https://matrimony.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-pink-500 transition"
        >
          Matrimony
        </a>{' '}
        || Powered By: <span className="font-semibold">WP Developers</span>
      </div>
    </footer>
  );
};

export default Footer;
