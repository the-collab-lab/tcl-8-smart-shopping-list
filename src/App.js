import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import { Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import List from './components/List';
import Welcome from './components/Welcome';
import { Navigation } from './components/Navigation';
import ListContextProvider from './context/ListContext';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';

function App() {
  // eslint-disable-next-line no-unused-vars
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
      <div>
        <header className="p-4">
          <h1 className="text-4xl text-center text-teal-900">Smart Shopping</h1>
        </header>
        <main className="flex-grow">
          <Route exact path="/">
            <Welcome />
            <ArchivalNoticeModal />
          </Route>
          <Route path="/list" component={List} />
          <Route path="/addItem" component={AddItem} />
        </main>

        <Navigation />
      </div>
    </ListContextProvider>
  );
}

export default App;
