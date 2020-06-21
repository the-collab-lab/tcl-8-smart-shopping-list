import React, { useState, useContext, Fragment } from 'react';
import { withFirestore } from 'react-firestore';
import '../styles/AddItemForm.css';
import UserContext from '../context/context';
import Modal from './Modal';

const AddItemForm = props => {
  const { getShoppingList } = useContext(UserContext);
  const [showModal, setModalDisplay] = useState(false);

  const emptyShoppingItem = {
    name: '',
    lastPurchasedDate: new Date().toDateString(),
    nextPurchase: 7,
  };

  const { firestore } = props;
  const [enteredValue, setEnteredValue] = useState(emptyShoppingItem);

  const handleChange = e => {
    setEnteredValue({ ...enteredValue, [e.target.name]: e.target.value });
  };

  const removePunctuation = (value) => {
    return value.replace(
      /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,
      '').replace(/ +/g, "").toLowerCase()
  }


  const addItem = e => {
    e.preventDefault();

    const items = getShoppingList();

    if (enteredValue.name === '') {
      alert('Please enter an item name');
    } else {
      const finalEnteredVal = removePunctuation(enteredValue.name)
  
      const result = items.filter(item => {  
        return removePunctuation(item.name)
          .includes(finalEnteredVal);
      });

      if (result.length) {
        setModalDisplay(true);
        console.log('error');
      } else {
        firestore.collection('shoppingList').add({
          name: enteredValue.name,
          nextPurchase: parseInt(enteredValue.nextPurchase, 10),
          token: localStorage.getItem('userToken'),
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
      {showModal && <Modal setDisplay={setModalDisplay} />}
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
          <button type="submit" onClick={addItem}>
            Add Item
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default withFirestore(AddItemForm);
