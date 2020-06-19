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
      <p>Click "New List" to create a shopping list from scratch</p>
      <button onClick={createNewList}>New List</button>
      <label>
        Join an existing list by typing in the list code
        <input type="text" placeholder="litton pawn tilth" />
        <button onClick={e => saveToken(e.target.value)}>
          Join Existing List
        </button>
      </label>
    </div>
  );
};
export default Welcome;
