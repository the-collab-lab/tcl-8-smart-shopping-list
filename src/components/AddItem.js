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
      <div className="form">
        <form>
          <label>
            Item name
            <input
              type="text"
              name="name"
              placeholder="Eggs"
              onChange={handleChange}
              value={enteredValue.name}
            />
          </label>
          <label>
            How soon do you expect to buy this again?
            <select
              type="text"
              name="nextPurchase"
              value={enteredValue.nextPurchase}
              onChange={handleChange}
            >
              <option value="7">Soon</option>
              <option value="14">Kind of Soon</option>
              <option value="30">Not soon</option>
            </select>
          </label>
          <button className="submit-button" type="submit" onClick={addItem}>
            Add Item
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default withFirestore(AddItemForm);
