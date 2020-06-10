import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import GetToken from '../lib/token.js';

const Welcome = () => {
  let history = useHistory();
  const push = history.push;

  const handleClick = () => {
    const token = GetToken();
    saveToken(token);
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
      <h2>Welcome to ShoppingList</h2>
      <button onClick={handleClick}>New List</button>
    </div>
  );
};
export default Welcome;
