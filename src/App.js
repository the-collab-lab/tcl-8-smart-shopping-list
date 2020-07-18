import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import { Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import List from './components/List';
import Welcome from './components/Welcome';
import { Navigation } from './components/Navigation';

import ListContextProvider from './context/ListContext';

function App() {
  const [token, setToken] = useState('');
  let history = useHistory();
  const push = history.push;

  const checkForToken = () => {
    return localStorage.getItem('userToken') ? true : false;
  };

  useEffect(() => {
    checkForToken() ? push('/list') : push('/');
    setToken(localStorage.getItem('userToken'));
  }, [push]);

  return (
    <ListContextProvider>
      <div className="flex-row max-w-4xl mx-auto bg-teal-200 bg-opacity-25 shadow-2xl relative h-screen">
        <header className="p-10">
          <h1 className="text-5xl text-center text-teal-800">Smart Shopping</h1>
        </header>
        <main>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/list" component={List} />
          <Route path="/addItem" component={AddItem} />
        </main>

        {token && <Navigation />}
      </div>
    </ListContextProvider>
  );
}

export default App;
