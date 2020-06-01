import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import AddItem from './components/AddItem';
import List from './components/List';

function App() {
  return (
    <div>
      <div className="nav">
        <div>
          <Link to="/">List</Link>
        </div>
        <div>
          <Link to="/addItem">Add Item</Link>
        </div>
      </div>
      <Route exact path="/" component={List} />
      <Route path="/addItem" component={AddItem} />
    </div>
  );
}

export default App;
