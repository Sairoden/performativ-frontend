interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  rating: string;
  genre: string;
  tags: string[];
  year: Date;
}

export const getAllMovies = async ({ filter }: { filter: string }) => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/movies?genre=${filter}`);
    const movies: Movie[] = await res.json();

    return movies.map(movie => ({
      ...movie,
      releaseYear: new Date(movie.year).getFullYear(),
      rating: parseFloat(movie.rating),
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createMovie = async (movie: {
  title: string;
  releaseYear: number;
  rating: number;
  genre: string;
  tags: string[];
}) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    if (!res.ok) throw new Error("Failed to create movie");
  } catch (err) {
    console.error(err);
  }
};

export const updateMovie = async (
  id: string,
  movie: {
    title?: string;
    releaseYear?: number;
    rating?: number;
    genre?: string;
    tags?: string[];
  }
) => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/movies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    if (!res.ok) throw new Error("Failed to update movie");
  } catch (err) {
    console.error(err);
  }
};

export const deleteMovie = async (id: string) => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to delete movie");
  } catch (err) {
    console.error(err);
  }
};
