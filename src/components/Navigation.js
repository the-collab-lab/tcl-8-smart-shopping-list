import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="flex max-w-full absolute bottom-0 left-0 right-0 m-2">
      <div style={{ width: '50%' }}>
        <NavLink exact to="/list" activeClassName="active">
          <button
            className={`w-full bg-transparent 
            hover:bg-teal-500 text-teal-700 
            font-semibold hover:text-white 
            py-2 px-4 border border-teal-500 
            hover:border-transparent rounded
            block sm:inline `}
          >
            List{' '}
          </button>
        </NavLink>
      </div>
      <div style={{ width: '50%' }}>
        <NavLink exact to="/addItem" activeClassName="active">
          <button
            className="w-full bg-transparent 
            hover:bg-teal-500 text-teal-700 
            font-semibold hover:text-white 
            py-2 px-4 border border-teal-500 
            hover:border-transparent rounded
            block sm:inline "
          >
            Add Item{' '}
          </button>
        </NavLink>
      </div>
    </nav>
  );
};
