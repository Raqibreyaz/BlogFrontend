import React, { useState, useCallback, memo } from "react";

type paramType = React.Dispatch<React.SetStateAction<string>>;

const SearchBar = memo(({ setSearch }: { setSearch: paramType }) => {

  const [query, setQuery] = useState("");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSearch(query);
    },
    [query]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center max-sm:text-sm sm:max-w-lg max-sm:w-[80%] bg-gray-300 rounded-full shadow-md p-2 mx-auto mb-6"
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="flex-grow px-4 py-2 w-[70%] text-gray-700 rounded-l-full focus:outline-none"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="Clear search"
          className="text-gray-500 text-2xl hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
      )}
      <button
        type="submit"
        aria-label="Search"
        className="bg-blue-500 text-white rounded-full sm:px-4 max-sm:text-xs px-2  py-2 ml-1 hover:bg-blue-600 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
});
export default SearchBar;
