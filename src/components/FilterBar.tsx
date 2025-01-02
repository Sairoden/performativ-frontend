// REACT
import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// STYLES
import { motion } from "framer-motion";
import { FaSortUp, FaSortDown } from "react-icons/fa";

// CONSTANTS
import { GENRES } from "../constants";

interface FilterBarProps {
  onSort: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

export default function FilterBar({ onSort }: FilterBarProps) {
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchParams, setSearchParams] = useSearchParams();

  const currentGenre = searchParams.get("genre") || "";

  const handleFilter = (genre: string) => {
    setSearchParams({ genre });
  };

  const handleSort = (newSortBy: string) => {
    if (newSortBy === sortBy)
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }

    onSort(newSortBy, sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex flex-wrap items-center justify-between mb-8 bg-[#2C2C2E] p-6 rounded-lg shadow-lg">
      <div className="flex flex-wrap gap-4 mb-4 sm:mb-0">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSort("title")}
          className="flex items-center px-4 py-2 text-[#171717] bg-[#F9F6EE] rounded-lg hover:bg-white transition duration-300 ease-in-out"
        >
          Title
          {sortBy === "title" &&
            (sortOrder === "asc" ? (
              <FaSortUp className="ml-2" />
            ) : (
              <FaSortDown className="ml-2" />
            ))}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSort("releaseYear")}
          className="flex items-center px-4 py-2 text-[#171717] bg-[#F9F6EE] hover:bg-white  rounded-lg transition duration-300 ease-in-out"
        >
          Release Year
          {sortBy === "releaseYear" &&
            (sortOrder === "asc" ? (
              <FaSortUp className="ml-2" />
            ) : (
              <FaSortDown className="ml-2" />
            ))}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSort("rating")}
          className="flex items-center px-4 py-2 text-[#171717] bg-[#F9F6EE] hover:bg-white rounded-lg transition duration-300 ease-in-out"
        >
          Rating
          {sortBy === "rating" &&
            (sortOrder === "asc" ? (
              <FaSortUp className="ml-2" />
            ) : (
              <FaSortDown className="ml-2" />
            ))}
        </motion.button>
      </div>

      <select
        value={currentGenre}
        onChange={e => handleFilter(e.target.value)}
        className="px-4 py-2 text-[#171717] bg-[#F9F6EE] hover:bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] transition duration-300 ease-in-out"
      >
        <option value="">All Genres</option>

        {GENRES.map(genre => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}
