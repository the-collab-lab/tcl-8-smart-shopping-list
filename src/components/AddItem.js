import React, { useState, useEffect } from 'react';
import { withFirestore } from 'react-firestore';
import '../styles/AddItem.css';
import { v4 as uuidv4 } from 'uuid';

const AddItem = props => {
  const emptyShoppingItem = {
    name: '',
    lastPurchasedDate: null,
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
      firestore.collection('shoppingList').add({
        name: enteredValue.name,
        nextPurchase: parseInt(enteredValue.nextPurchase, 10),
        token: localStorage.getItem('userToken'),
      });

      resetInput();
    }
  };

  const resetInput = () => {
    setEnteredValue(emptyShoppingItem);
  };

  useEffect(() => {
    const userToken = uuidv4();
    localStorage.setItem('userToken', userToken);
  }, []);

  return (
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
  );
};

export default withFirestore(AddItem);
