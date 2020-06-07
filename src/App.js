import React from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import List from './components/List';

function App() {
  return (
    <div>
      <header>
        <h1>Shopping List</h1>
      </header>
      <main>
        <Route exact path="/" component={List} />
        <Route path="/addItem" component={AddItem} />
      </main>
      <div className="nav">
        {/* NavLink is used here instead of Link for the activeClassName property */}
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
    </div>
  );
}

export default App;
