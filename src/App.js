import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import { Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import List from './components/List';
import Welcome from './components/Welcome';
import { Navigation } from './components/Navigation';
import ListContextProvider from './context/ListContext';

import lemons from './assets/images/lemons.jpg';

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

  const background = {
    backgroundImage: `url(${lemons})`,
  };

  return (
    <ListContextProvider>
      <div
        style={background}
        className="
          border-b-8 border-teal-600
          bg-center
          bg-cover 
          flex-row mx-auto 
          bg-gray-100
          relative h-screen"
      >
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
        <span>
          Photo by{' '}
          <a href="https://unsplash.com/@neryfabiola_?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Nery Montenegro
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/s/photos/peach-color-food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Unsplash
          </a>
        </span>
      </div>
    </ListContextProvider>
  );
}

export default App;
