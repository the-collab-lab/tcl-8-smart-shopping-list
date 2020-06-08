import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div>
      <h2>Welcome to ShoppingList</h2>
      <Link to="/list">New List</Link>
    </div>
  );
};
export default Welcome;
