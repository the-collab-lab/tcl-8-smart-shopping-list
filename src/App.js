import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import { Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import List from './components/List';
import Welcome from './components/Welcome';
import { Navigation } from './components/Navigation';

function App() {
  const [token, setToken] = useState('');
  let history = useHistory();
  const push = history.push;

  const checkForToken = () => {
    return localStorage.getItem('userToken') ? true : false;
  };

  useEffect(() => {
    checkForToken() ? push('/list') : push('/');
  }, [push]);

  return (
    <div>
      <header>
        <h1>Shopping List</h1>
      </header>
      <main>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/list" component={List} />
        <Route path="/addItem" component={AddItem} />
      </main>
      <Navigation />
    </div>
  );
}

export default App;
