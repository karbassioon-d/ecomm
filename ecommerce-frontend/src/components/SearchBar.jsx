import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {

    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a product"
        value={query}
        onChange={handleInputChange}
        className="text-purple-600 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    />
    </div>
  )
}

export default SearchBar;
