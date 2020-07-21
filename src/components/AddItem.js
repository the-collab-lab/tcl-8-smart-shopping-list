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

      <div className="w-full max-w-md mx-auto p-5">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Item name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Eggs"
              onChange={handleChange}
              value={enteredValue.name}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              How soon do you expect to buy this again?
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option value="7">Soon</option>
                <option value="14">Kind of Soon</option>
                <option value="30">Not soon</option>
              </select>
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
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-transparent 
              hover:bg-teal-500 text-teal-700 
              font-semibold hover:text-white 
              py-2 px-4 border border-teal-500 
              hover:border-transparent rounded
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
