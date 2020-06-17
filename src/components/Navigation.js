import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="nav">
        <div>
          <NavLink exact to="/list" activeClassName="active">
            List
          </NavLink>
        </div>
        <div>
          <NavLink exact to="/addItem" activeClassName="active">
            Add Item
          </NavLink>
        </div>
    </nav>
  );
};
