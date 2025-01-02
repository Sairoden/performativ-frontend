/* eslint-disable @typescript-eslint/no-explicit-any */
// REACT
import React from "react";

// LIBRARIES
import { useForm } from "react-hook-form";

// STYLES
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

// CONSTANTS
import { GENRES } from "../constants";

interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  rating: number;
  genre: string;
  tags: string[];
  year: Date;
}

interface MovieFormProps {
  movie?: Movie;
  onSave: (movie: Omit<Movie, "id">) => void;
  onCancel: () => void;
}

export default function MovieForm({ movie, onSave, onCancel }: MovieFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: movie?.title || "",
      releaseYear: movie?.releaseYear || 2025,
      rating: movie?.rating || 0,
      genre: movie?.genre || "",
      tags: movie?.tags.join(", ") || "",
    },
  });

  const onSubmit = (data: any) => {
    onSave({
      title: data.title,
      releaseYear: data.releaseYear,
      rating: +data.rating,
      genre: data.genre,
      tags: data.tags.split(",").map((tag: string) => tag.trim()),
      year: new Date(`${data.releaseYear}-01-01`),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-[#2C2C2E] rounded-lg shadow-2xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-semibold text-white">
            {movie ? "Edit Movie" : "Add Movie"}
          </h2>

          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#6C5CE7]"
            />
          </div>

          <div>
            <label
              htmlFor="releaseYear"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Release Year
            </label>
            <input
              type="number"
              id="releaseYear"
              {...register("releaseYear", { required: true })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#6C5CE7]"
            />
          </div>

          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Rating
            </label>
            <input
              type="number"
              id="rating"
              {...register("rating", { required: true, min: 0, max: 10 })}
              step="0.1"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#6C5CE7]"
            />
          </div>

          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Genre
            </label>

            <select
              id="genre"
              {...register("genre", { required: true })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#6C5CE7]"
            >
              <option value="">Select a genre</option>

              {GENRES.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              {...register("tags")}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#6C5CE7]"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-[#6C5CE7] text-white rounded-lg hover:bg-[#5A4ED1] transition duration-300"
            >
              Save
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
