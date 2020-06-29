import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withFirestore } from 'react-firestore';
import '../styles/Welcome.css';
import GetToken from '../lib/token.js';

const Welcome = ({ firestore }) => {
  const [token, setToken] = useState('');

  let history = useHistory();
  const push = history.push;

  const saveToken = token => {
    localStorage.setItem('userToken', token);
    console.log('token saved!');
  };

  const handleChange = e => {
    setToken(e.target.value);
  };

  const handleSubmitToken = e => {
    e.preventDefault();
    if (token === undefined || token === '') {
      alert('Please enter a token');
    } else {
      firestore
        .collection('shoppingList')
        .where('token', '==', token)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            alert('No shopping list with that token');
          } else {
            saveToken(token);
            push('/list');
          }
          // NOTE: not sure why the below doesn't work
          // snapshot.forEach(doc => {
          //   if (!doc.exists) {
          //     console.log('No List With that token!');
          //   } else {
          //     saveToken(e.target.value);
          //   }
          // })
        })
        .catch(err => console.log(err));
    }
  };

  const createNewList = () => {
    const newToken = GetToken();
    saveToken(newToken);
    setToken(newToken);
    push('/list');
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
            onChange={handleChange}
            value={token}
          />
        </label>
        <button>Join Existing List</button>
      </form>
    </div>
  );
};
export default withFirestore(Welcome);
