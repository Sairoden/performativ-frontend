interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  rating: number;
  genre: string;
  tags: string[];
  year: Date;
}

type SortableKeys = keyof Pick<Movie, "title" | "releaseYear" | "rating">;

export function sortMovies(
  movies: Movie[],
  sortBy: SortableKeys,
  sortOrder: "asc" | "desc"
): Movie[] {
  return [...movies].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}

describe("sortMovies", () => {
  const movies = [
    {
      id: "1",
      title: "B Movie",
      releaseYear: 2020,
      rating: 7.5,
      genre: "Action",
      tags: [],
      year: new Date(),
    },
    {
      id: "2",
      title: "A Movie",
      releaseYear: 2021,
      rating: 8.0,
      genre: "Comedy",
      tags: [],
      year: new Date(),
    },
    {
      id: "3",
      title: "C Movie",
      releaseYear: 2019,
      rating: 6.5,
      genre: "Drama",
      tags: [],
      year: new Date(),
    },
  ];

  it("sorts movies by title in ascending order", () => {
    const sorted = sortMovies(movies, "title", "asc");
    expect(sorted.map(m => m.title)).toEqual(["A Movie", "B Movie", "C Movie"]);
  });

  it("sorts movies by title in descending order", () => {
    const sorted = sortMovies(movies, "title", "desc");
    expect(sorted.map(m => m.title)).toEqual(["C Movie", "B Movie", "A Movie"]);
  });

  it("sorts movies by releaseYear in ascending order", () => {
    const sorted = sortMovies(movies, "releaseYear", "asc");
    expect(sorted.map(m => m.releaseYear)).toEqual([2019, 2020, 2021]);
  });

  it("sorts movies by releaseYear in descending order", () => {
    const sorted = sortMovies(movies, "releaseYear", "desc");
    expect(sorted.map(m => m.releaseYear)).toEqual([2021, 2020, 2019]);
  });

  it("sorts movies by rating in ascending order", () => {
    const sorted = sortMovies(movies, "rating", "asc");
    expect(sorted.map(m => m.rating)).toEqual([6.5, 7.5, 8.0]);
  });

  it("sorts movies by rating in descending order", () => {
    const sorted = sortMovies(movies, "rating", "desc");
    expect(sorted.map(m => m.rating)).toEqual([8.0, 7.5, 6.5]);
  });
});
