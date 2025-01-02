// REACT
import { useSearchParams } from "react-router-dom";

// LIBRARIES
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// STYLES
import toast from "react-hot-toast";

// SERVICES
import {
  getAllMovies,
  createMovie as createMovieApi,
  updateMovie as updateMovieApi,
  deleteMovie as deleteMovieApi,
} from "../services";

export const useGetAllMovies = () => {
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("genre") || "";

  const { data: movies, isPending } = useQuery({
    queryKey: ["movies", filter],
    queryFn: () => getAllMovies({ filter }),
  });

  return { movies, isPending };
};

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  const { mutate: createMovie, isPending } = useMutation({
    mutationFn: createMovieApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      toast.success("New movie successfully added");
    },
    onError: err => toast.error(err.message),
  });

  return { createMovie, isPending };
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  const { mutate: updateMovie, isPending } = useMutation({
    mutationFn: ({
      id,
      movie,
    }: {
      id: string;
      movie: {
        title?: string;
        releaseYear?: number;
        rating?: number;
        genre?: string;
        tags?: string[];
      };
    }) => updateMovieApi(id, movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      toast.success("Movie successfully updated");
    },
    onError: err => toast.error(err.message),
  });

  return { updateMovie, isPending };
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteMovie, isPending } = useMutation({
    mutationFn: deleteMovieApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      toast.success("Movie successfully deleted");
    },
    onError: err => toast.error(err.message),
  });

  return { deleteMovie, isPending };
};
