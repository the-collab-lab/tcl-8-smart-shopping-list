import React from 'react';
import '../styles/Search.css';

export default ({ handleInputChange, inputText, handleClearInput }) => {
  return (
    <>
      <input
        className="search"
        onChange={handleInputChange}
        value={inputText}
        type="search"
        placeholder="search your item..."
        //NOTE: Try to make clear button more accessible
      />
    </>
  );
};
