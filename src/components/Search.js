import React from 'react';
import '../styles/Search.css';

const Search = ({ handleInputChange, inputText, handleClearInput }) => {
  return (
    <div>
      <input
        className="w-full bg-transparent text-teal-700 
                    font-semibold 
        py-2 px-4 border border-teal-500 
        rounded-full
            block focus mb-8"
        onChange={handleInputChange}
        value={inputText}
        type="text"
        placeholder="search for your item..."
        title="search"
      />
      {inputText.length > 0 && (
        <button className="clear-button" onClick={handleClearInput}>
          X
        </button>
      )}
    </div>
  );
};

export default Search;
