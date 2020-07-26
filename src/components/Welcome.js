import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withFirestore } from 'react-firestore';
import GetToken from '../lib/token.js';

const Welcome = ({ firestore }) => {
  const [token, setToken] = useState('');
  const [showModal, setModalDisplay] = useState(false);

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

  const buttonClasses =
    'bg-primary p-3 hover:bg-primary-darker hover:text-white text-lg rounded';

  return (
    <div className="flex flex-col bg-cream rounded-lg border border-primary shadow-med max-w-xs mx-auto p-12 mt-8">
      <button
        className="bg-primary p-3 hover:bg-primary-darker hover:text-white text-lg rounded mb-5"
        onClick={createNewList}
      >
        CREATE A NEW LIST
      </button>
      <p className="m-3 self-center text-large">- OR -</p>
      {!showModal && (
        <button
          className="bg-primary p-3 hover:bg-primary-darker hover:text-white text-lg rounded mt-5"
          onClick={() => setModalDisplay(true)}
        >
          JOIN AN EXISTING LIST
        </button>
      )}

      {showModal && (
        <form
          className="flex flex-col w-full max-w-sm p-6"
          onSubmit={handleSubmitToken}
        >
          <div className="border-b border-b-2 border-teal-500 py-2">
            <input
              type="text"
              placeholder="litton pawn tilth"
              onChange={handleChange}
              value={token}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
            <button className={buttonClasses}>Join</button>
            <button
              onClick={() => setModalDisplay(false)}
              className={buttonClasses}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default withFirestore(Welcome);
