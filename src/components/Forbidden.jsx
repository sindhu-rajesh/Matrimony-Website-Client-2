import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { FaBan } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen w-11/12 mx-auto flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "backOut" }}
        className="text-block-700"
      >
        <FaBan className="text-[120px] mb-4" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-5xl font-bold text-block-700"
      >
        403 Forbidden
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-gray-600 mt-4 text-lg max-w-xl"
      >
        You don’t have permission to access this page. Please contact your
        administrator or return to a valid route.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="inline-block bg-rose-700 hover:bg-rose-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          ⬅ Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Forbidden;
