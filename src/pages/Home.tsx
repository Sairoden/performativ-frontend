// REACT
import { useState, useEffect } from "react";

// STYLES
import { motion, AnimatePresence } from "framer-motion";

// COMPONENTS
import {
  MovieList,
  MovieForm,
  FilterBar,
  SearchBar,
  LoadingSpinner,
} from "../components";

// TYPES
import { Movie } from "../types";

// HOOKS
import {
  useGetAllMovies,
  useCreateMovie,
  useUpdateMovie,
  useDeleteMovie,
} from "../hooks";

interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  rating: number;
  genre: string;
  tags: string[];
  year: Date;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isAddingMovie, setIsAddingMovie] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>(
    undefined
  );

  // HOOKS
  const { movies: myMovies = [], isPending: isPending1 } =
    useGetAllMovies() as {
      movies: Movie[];
      isPending: boolean;
    };
  const { createMovie, isPending: isPending2 } = useCreateMovie();
  const { updateMovie, isPending: isPending3 } = useUpdateMovie();
  const { deleteMovie, isPending: isPending4 } = useDeleteMovie();

  useEffect(() => {
    if (!isPending1) setMovies(myMovies);
  }, [myMovies, isPending1]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleAddMovie = (movie: Omit<Movie, "id" | "year">) => {
    createMovie(movie);
    setIsAddingMovie(false);
  };

  const handleUpdateMovie = (updatedMovie: Omit<Movie, "id" | "year">) => {
    if (editingMovie) {
      updateMovie({ id: editingMovie.id, movie: updatedMovie });

      setEditingMovie(undefined);
    }
  };

  const handleDeleteMovie = (id: string) => {
    deleteMovie(id);
  };

  if (isPending1 || isPending2 || isPending3 || isPending4)
    return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#F9F6EE] bg-[url('/dots.svg')] p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <a href="https://www.performativ.com/">
          <img
            src="https://cdn.prod.website-files.com/66d6faacb8a70567e8953e98/66d6faacb8a70567e8953ed6_Performative%20logo.svg"
            loading="lazy"
            alt="Performativ logo"
          />
        </a>

        <h1 className="text-6xl font-serif font-bold text-[#2C2C2E] mb-4">
          Performativ Movie Manager
        </h1>

        <p className="text-2xl text-gray-600">
          Revolutionizing Movie Collection Software
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            <div className="w-full md:w-1/2">
              <SearchBar
                onSearch={query => {
                  setFilteredMovies(
                    movies.filter(
                      movie =>
                        movie.title
                          .toLowerCase()
                          .includes(query.toLowerCase()) ||
                        movie.genre
                          .toLowerCase()
                          .includes(query.toLowerCase()) ||
                        movie.tags.some(tag =>
                          tag.toLowerCase().includes(query.toLowerCase())
                        )
                    )
                  );
                }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#6C5CE7] text-white px-8 py-3 rounded-lg shadow-lg hover:bg-[#5A4ED1] transition duration-300 ease-in-out text-lg font-semibold"
              onClick={() => setIsAddingMovie(true)}
            >
              Add Movie
            </motion.button>
          </div>

          <FilterBar
            onSort={(sortBy, sortOrder) => {
              const sorted = [...filteredMovies].sort((a, b) => {
                if (a[sortBy as keyof Movie] < b[sortBy as keyof Movie])
                  return sortOrder === "asc" ? -1 : 1;
                if (a[sortBy as keyof Movie] > b[sortBy as keyof Movie])
                  return sortOrder === "asc" ? 1 : -1;
                return 0;
              });
              setFilteredMovies(sorted);
            }}
          />

          <MovieList
            movies={filteredMovies}
            onEdit={setEditingMovie}
            onDelete={handleDeleteMovie}
          />
        </div>
      </div>

      <AnimatePresence>
        {(isAddingMovie || editingMovie) && (
          <MovieForm
            movie={editingMovie}
            onSave={editingMovie ? handleUpdateMovie : handleAddMovie}
            onCancel={() => {
              setIsAddingMovie(false);
              setEditingMovie(undefined);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
