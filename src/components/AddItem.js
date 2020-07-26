import React, { useState, useContext, Fragment } from 'react';
import { withFirestore } from 'react-firestore';
import '../styles/AddItemForm.css';
import { ListContext } from '../context/ListContext';
import Modal from './Modal';

const AddItemForm = props => {
  const { filteredList } = useContext(ListContext);

  const [showModal, setModalDisplay] = useState(false);

  const emptyShoppingItem = {
    name: '',
    nextPurchase: 7,
  };

  const { firestore } = props;
  const [enteredValue, setEnteredValue] = useState(emptyShoppingItem);

  const handleChange = e => {
    setEnteredValue({ ...enteredValue, [e.target.name]: e.target.value });
  };

  const addItem = e => {
    e.preventDefault();

    if (enteredValue.name === '') {
      alert('Please enter an item name');
    } else {
      const removePunctuation = enteredValue.name.replace(
        /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,
        '',
      ); // removes punctuation
      const finalEnteredVal = removePunctuation.replace(/\s{2,}/g, ''); // removes extra spacing

      const result = filteredList.filter(item => {
        return item.name
          .toLowerCase()
          .replace(/\s{1,}/g, '')
          .includes(finalEnteredVal.toLowerCase().replace(/\s{1,}/g, ''));
      });

      if (result.length) {
        setModalDisplay(true);
      } else {
        firestore.collection('shoppingList').add({
          name: finalEnteredVal,
          nextPurchase: parseInt(enteredValue.nextPurchase, 10),
          token: localStorage.getItem('userToken'),
          numberOfPurchases: 1,
          lastPurchasedDate: new Date(),
        });
      }
    }
    resetInput();
  };

  const resetInput = () => {
    setEnteredValue(emptyShoppingItem);
  };

  return (
    <Fragment>
      {showModal && (
        <Modal setDisplay={setModalDisplay}>
          <h1>Error</h1>
          <p>You have already added this item.</p>
        </Modal>
      )}

      <div className="flex justify-center m-2 h-center">
        <form className="bg-gray-100 shadow-md h-60 w-full max-w-lg mx-auto border-4 rounded-lg border border-teal-600 px-6 py-8">
          <h3 className="text-darkgray text-xl font-bold text-center mb-4">
            Add New Item
          </h3>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Item name
            </label>
            <input
              className="shadow appearance-none border border-gray-600 rounded-lg w-full mt-2 py-3 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:border-teal-500"
              type="text"
              aria-label="name"
              name="name"
              placeholder="Eggs"
              onChange={handleChange}
              value={enteredValue.name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              How soon do you expect to buy this again?
            </label>
            {/* <select
                className="block appearance-none w-full border border-teal-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                id="grid-state"
                name="nextPurchase"
                value={enteredValue.nextPurchase}
                onChange={handleChange}
              >
                <option value="7">Soon</option>
                <option value="14">Kind of Soon</option>
                <option value="30">Not soon</option>
              </select> */}
            <div className="flex flex-col items-center sm:flex-row">
              <label
                className="bg-transparent text-center mt-2 border border-b-4 border-green-600 hover:bg-green-600 hover:text-white active:border-green-400 rounded-lg py-2 px-4 w-40 sm:w-full sm:mx-2"
                checked
                value={enteredValue.nextPurchase}
              >
                Soon
                <input
                  className="radio"
                  type="radio"
                  name="nextPurchase"
                  value="7"
                  onChange={handleChange}
                />
              </label>
              <label
                className="bg-transparent text-center mt-2 border border-b-4 border-yellow-600 hover:bg-yellow-600 hover:text-white active:border-yellow-400 rounded-lg py-2 px-4 w-40 sm:w-full sm:mx-2"
                value={enteredValue.nextPurchase}
              >
                Kind of soon
                <input
                  className="radio"
                  type="radio"
                  name="nextPurchase"
                  value="14"
                  onChange={handleChange}
                />
              </label>
              <label
                className="bg-transparent text-center mt-2 border border-b-4  border-red-600 hover:bg-red-600 hover:text-white active:border-red-400 rounded-lg py-2 px-4 w-40 sm:w-full sm:mx-2"
                value={enteredValue.nextPurchase}
              >
                Not so soon
                <input
                  className="radio"
                  type="radio"
                  name="nextPurchase"
                  value="30"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {enteredValue.nextPurchase && (
            <p className="flex flex-col items-center justify-around mb-2 max-w-18 text-gray-700 text-sm font-bold">
              In {enteredValue.nextPurchase} days
            </p>
          )}

          <div className="flex justify-center">
            <button
              className="bg-teal-700 w-64
              hover:bg-teal-400 text-white 
              font-semibold hover:text-white 
              py-2 px-4 mt-2 border border-gray-700  outlune-none
              hover:border-teal-800 rounded
              block sm:inline"
              type="submit"
              onClick={addItem}
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default withFirestore(AddItemForm);
