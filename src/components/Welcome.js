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
    <div>
      <div className="max-w-xs mx-auto">
        <button
          className="bg-transparent 
            hover:bg-teal-500 text-teal-700 
            font-semibold hover:text-white 
            py-2 px-4 border border-teal-500 
            hover:border-transparent rounded
            block sm:inline "
          onClick={createNewList}
        >
          Create a new list
        </button>

        <span
          className="text-xs cursor-pointer"
          onClick={() => setModalDisplay(true)}
        >
          {' '}
          or join an existing list{' '}
        </span>

        {showModal && (
          <form className="w-full max-w-sm p-6" onSubmit={handleSubmitToken}>
            <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
              <input
                type="text"
                placeholder="litton pawn tilth"
                onChange={handleChange}
                value={token}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
              <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                Join
              </button>
              <button
                onClick={() => setModalDisplay(false)}
                class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default withFirestore(Welcome);
