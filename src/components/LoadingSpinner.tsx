// REACT
import React from "react";

// STYLES
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F9F6EE] bg-[url('/dots.svg')]">
      <div className="relative flex items-center justify-center w-32 h-32">
        <div className="absolute w-32 h-32 border-8 border-gray-300 border-t-transparent rounded-full animate-spin" />

        <div className="absolute w-20 h-20 border-8 border-gray-400 border-t-transparent rounded-full animate-spin-slow" />

        <div className="w-12 h-12 bg-gray-600 rounded-full" />
      </div>

      <motion.div
        className="text-center mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-5xl font-serif font-bold text-[#2C2C2E] mb-3">
          Personalizing your movies...
        </h2>
      </motion.div>
    </div>
  );
}
