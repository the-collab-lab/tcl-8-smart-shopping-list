import React from 'react';
import '../styles/Search.css';

export default ({ handleInputChange, inputText }) => {
  return (
    <input
      className="search"
      onChange={handleInputChange}
      value={inputText}
      type="text"
      placeholder="search your item..."
    />
  );
};
