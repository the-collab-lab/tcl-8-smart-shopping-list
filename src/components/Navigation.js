import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="flex max-w-full absolute bottom-0 left-0 right-0 inline-block m-2">
    <div style={{width: '50%'}}>
        <button className="w-full bg-transparent 
            hover:bg-teal-500 text-teal-700 
            font-semibold hover:text-white 
            py-2 px-4 border border-teal-500 
            hover:border-transparent rounded
            block sm:inline ">
          <NavLink exact to="/list" activeClassName="active">
            List
          </NavLink>
        </button>
    </div>
    <div style={{width: '50%'}}>
        <button className="w-full bg-transparent 
            hover:bg-teal-500 text-teal-700 
            font-semibold hover:text-white 
            py-2 px-4 border border-teal-500 
            hover:border-transparent rounded
            block sm:inline ">
          <NavLink exact to="/addItem" activeClassName="active">
            Add Item
          </NavLink>
        </button>
    </div>
    </nav>
  );
};
