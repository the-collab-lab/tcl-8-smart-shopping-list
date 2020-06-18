import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import { Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import List from './components/List';
import Welcome from './components/Welcome';
import { Navigation } from './components/Navigation';

import { UserProvider } from './context/context';

import GetToken from './lib/token.js';

function App() {
  const [token, setToken] = useState('');
  let history = useHistory();
  const push = history.push;

  const handleClick = () => {
    const newToken = GetToken();
    saveToken(newToken);
    setToken(newToken);
    push('/addItem');
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
    <UserProvider>
      <div>
        <header>
          <h1>Shopping List</h1>
          <p>Token: {token}</p>
        </header>
        <main>
          <Route exact path="/">
            <Welcome handleClick={handleClick} />
          </Route>
          <Route path="/list" component={List} />
          <Route path="/addItem" component={AddItem} />
        </main>
        <Navigation />
      </div>
    </UserProvider>
  );
}

export default App;
