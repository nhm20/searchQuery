import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

function SearchBox({ onSearch, initialQuery }) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleReset = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="form relative flex items-center mx-auto w-full sm:w-3/4 md:w-1/2">
      <button
        type="button"
        className="absolute left-2 -translate-y-1/2 top-1/2 p-1"
        onClick={handleSubmit}
      >
        <svg
          width="17"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="search"
          className="w-5 h-5 text-gray-700 pt-[2px]"
        >
          <path
            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
            stroke="currentColor"
            strokeWidth="1.333"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md flex-grow"
        required
      />
      <button
        type="reset"
        className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
        onClick={handleReset}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </form>
  );
}

export default SearchBox;