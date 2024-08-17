import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the search logic here
    console.log('Search query:', query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full shadow-md p-2 w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="flex-grow px-4 py-2 text-gray-700 rounded-l-full focus:outline-none"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
      )}
      <button
        type="submit"
        aria-label="Search"
        className="bg-blue-500 text-white rounded-full px-4 py-2 ml-2 hover:bg-blue-600 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
