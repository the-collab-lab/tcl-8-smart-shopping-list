import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import List from './components/List';
import Welcome from './components/Welcome';

import GetToken from './lib/token.js';

function App() {
  const [token, setToken] = useState('');
  let history = useHistory();
  const push = history.push;

  const handleClick = () => {
    const newToken = GetToken();
    saveToken(newToken);
    setToken(newToken);
    push('/list');
  };

  const checkForToken = () => {
    return localStorage.getItem('userToken') ? true : false;
  };

  const saveToken = token => {
    localStorage.setItem('userToken', token);
    console.log('token saved!');
  };

  useEffect(() => {
    checkForToken() ? push('/list') : push('/');
  }, [push]);

  return (
    <div>
      <header>
<<<<<<< HEAD
        <h1>Smart Shopping</h1>
=======
        <h1>Shopping List</h1>
        <p>Token: {token}</p>
>>>>>>> move token logic to app component
      </header>
      <main>
        <Route exact path="/">
          <Welcome handleClick={handleClick} />
        </Route>
        <Route path="/list" component={List} />
        <Route path="/addItem" component={AddItem} />
      </main>
      <div className="nav">
        {/* NavLink is used here instead of Link for the activeClassName property */}
        {checkForToken() && (
          <>
            {' '}
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;
