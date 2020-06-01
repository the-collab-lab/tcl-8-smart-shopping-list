import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import List from './components/List';

function App() {
  return (
    <div>
      <div className="nav">
        <div>
          <NavLink exact to="/" activeClassName="active">
            List
          </NavLink>
        </div>
        <div>
          <NavLink exact to="/addItem" activeClassName="active">
            Add Item
          </NavLink>
        </div>
      </div>
      <Route exact path="/" component={List} />
      <Route path="/addItem" component={AddItem} />
    </div>
  );
}

export default App;
