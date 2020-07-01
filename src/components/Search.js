import React from 'react';
import '../styles/Search.css';

export default ({ handleInputChange, inputText, handleClearInput }) => {
  return (
    <>
      <input
        className="search-input"
        onChange={handleInputChange}
        value={inputText}
        type="text"
        placeholder="search your item..."
        //NOTE: Try to make clear button more accessible
      />
      {inputText.length ? (
        <button className="clear-button" onClick={handleClearInput}>
          X
        </button>
      ) : null}
    </>
  );
};
