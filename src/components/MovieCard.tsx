// REACT
import React from "react";
import { useState } from "react";

// STYLES
import { motion } from "framer-motion";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";

// TYPES
import { Movie } from "../types";

// COMPONENTS
import { MovieModal } from "./index";

interface MovieCardProps {
  movie: Movie;
  onEdit: () => void;
  onDelete: () => void;
}

export default function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.02 }}
        className="bg-[#2C2C2E] rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-48">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-serif font-semibold text-white mb-1">
              {movie.title}
            </h3>

            <p className="text-gray-300">{movie.releaseYear}</p>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-2">
            <FaStar className="text-[#6C5CE7] mr-1" />
            <span className="text-white">{movie.rating.toFixed(1)}</span>
          </div>

          <p className="text-[#6C5CE7] font-medium mb-2">{movie.genre}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-gray-800 text-gray-300 px-2 py-1 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-[#6C5CE7] hover:text-[#5A4ED1]"
              onClick={e => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <FaEdit />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-red-400 hover:text-red-500"
              onClick={e => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <FaTrash />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {isModalOpen && (
        <MovieModal movie={movie} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
