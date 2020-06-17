import React from 'react';

const Welcome = ({ handleClick }) => {
  return (
    <div>
      <h2>Welcome to ShoppingList</h2>
      <button onClick={handleClick}>New List</button>
      <label>
        Join List
        <input type="text" placeholder="XXXX-XXXX-XXXX" />
        <button>Join</button>
      </label>
    </div>
  );
};
export default Welcome;
