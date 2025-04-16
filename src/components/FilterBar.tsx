import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface FilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}

export default function FilterBar({ search, setSearch, filter, setFilter }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
    <div className="relative w-full sm:w-1/2">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search todos..."
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition"
      />
    </div>
      <select
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition cursor-pointer"
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Incomplete">Incomplete</option>
      </select>
    </div>
  );
}