// REACT
import React from "react";

// STYLES
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaStar } from "react-icons/fa";

// TYPES
import { Movie } from "../types";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-[#2C2C2E] rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          </div>

          <div className="w-full md:w-1/2 p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-4xl font-serif font-bold text-white">
                {movie.title}
              </h2>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center text-2xl">
                <FaStar className="text-[#6C5CE7] mr-2" size={28} />

                <span className="text-white font-semibold">
                  {movie.rating.toFixed(1)}
                </span>
              </div>

              <p className="text-xl text-gray-300">
                Released: {movie.releaseYear}
              </p>

              <p className="text-xl font-medium text-[#6C5CE7]">
                {movie.genre}
              </p>

              <div className="flex flex-wrap gap-2">
                {movie.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.description}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
