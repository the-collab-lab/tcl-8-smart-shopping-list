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
  // const saveToken = token => {
  //   localStorage.setItem('userToken', token);
  //   console.log('token saved!');
  // };

  const handleSubmitToken = e => {
    e.preventDefault();

    // check firebase for whether token exists
    // if yes, save the token into local storage and push to `/list`
    // if no, alert("invalid code, try again")
  };

  const createNewList = () => {
    const newToken = GetToken();
    // saveToken(newToken);
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

      <form className="Welcome-JoinList" onSubmit={handleSubmitToken}>
        <label>
          Join an existing list:
          <input
            type="text"
            placeholder="litton pawn tilth"
            onChange={e => setToken(e.target.value)}
            value={token}
          />
        </label>
        <button>Join Existing List</button>
      </form>
    </div>
  );
};
export default Welcome;
