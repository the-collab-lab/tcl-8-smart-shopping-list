import React, { useState, useHistory } from 'react';

import GetToken from '../lib/token.js';

// need to create a form handling the tokens
// https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/

const Welcome = () => {
  const [token, setToken] = useState('');
  //let history = useHistory();
  //const push = history.push;

  // token is saved locally, but not connected to firebase
  const saveToken = token => {
    localStorage.setItem('userToken', token);
    console.log('token saved!');
  };

  const createNewList = () => {
    const newToken = GetToken();
    saveToken(newToken);
    setToken(newToken);
    //push('/list');
  };

  return (
    <div>
      <h2>Welcome to ShoppingList</h2>
      <button onClick={createNewList}>New List</button>
      <label>
        Join List
        <input type="text" placeholder="litton pawn tilth" />
        <button onClick={e => saveToken(e.target.value)}>Join</button>
      </label>
    </div>
  );
};
export default Welcome;
