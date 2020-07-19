import React from 'react';
import '../styles/Search.css';

const Search = ({ handleInputChange, inputText, handleClearInput }) => {
  return (
    <>
      <input
        className="search-input"
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
    </>
  );
};

export default Search;
