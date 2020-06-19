import React, { useState, useHistory } from 'react';
import '../styles/Welcome.css';
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
    <div className="Welcome">
      <h2>Welcome to ShoppingList</h2>
      <div className="Welcome-NewList">
        <p>Create a new list: </p>
        <button onClick={createNewList}>New List</button>
      </div>
      <div className="Welcome-JoinList">
        <label>
          Join an existing list:
          <input type="text" placeholder="litton pawn tilth" />
        </label>
        <button onClick={e => saveToken(e.target.value)}>
          Join Existing List
        </button>
      </div>
    </div>
  );
};
export default Welcome;
