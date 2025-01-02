// REACT
import React from "react";
import { useState, FormEvent } from "react";

// STYLES
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full px-6 py-3 rounded-lg bg-[#2C2C2E] text-white border-2 border-gray-700 focus:outline-none focus:border-[#6C5CE7] transition duration-300 ease-in-out text-lg placeholder-gray-400"
      />

      <motion.button
        type="submit"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#6C5CE7] transition duration-300 ease-in-out"
      >
        <FaSearch size={20} />
      </motion.button>
    </form>
  );
}
