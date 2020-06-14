import React from 'react';

const Welcome = ({ handleClick }) => {
  return (
    <div>
      <h2>Welcome to ShoppingList</h2>
      <button onClick={handleClick}>New List</button>
    </div>
  );
};
export default Welcome;
