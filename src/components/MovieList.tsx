// REACT
import React from "react";
import { useSearchParams } from "react-router-dom";

// LIBRARIES
import { motion } from "framer-motion";

// COMPONENTS
import { MovieCard } from "./index";

// TYPES
import { Movie } from "../types";

interface MovieListProps {
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

export default function MovieList({
  movies,
  onEdit,
  onDelete,
}: MovieListProps) {
  const [searchParams] = useSearchParams();

  const currentGenre = searchParams.get("genre") || "";

  if (movies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-center py-16"
      >
        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4">
          No movies found{" "}
          {currentGenre !== "" ? `in ${currentGenre} genre` : ""}
        </h3>

        <p className="text-lg text-gray-600 mb-8">
          {currentGenre !== ""
            ? `Add some movies to see them here!`
            : "There are no movies in your collection. Start adding some movies!"}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onEdit={() => onEdit(movie)}
          onDelete={() => onDelete(movie.id)}
        />
      ))}
    </motion.div>
  );
}
