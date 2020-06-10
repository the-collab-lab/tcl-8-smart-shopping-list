import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import '../styles/AddItem.css'
import { v4 as uuidv4 } from 'uuid';


const AddItem = props => {
  const emptyShoppingItem = {
    name: '',
    lastPurchasedDate: null,
    nextPurchase: '',
  };

  const { firestore } = props;
  const [enteredValue, setEnteredValue] = useState(emptyShoppingItem);

  const handleChange = e => {
    console.log('state', enteredValue);
    setEnteredValue({ ...enteredValue, [e.target.name]: e.target.value });
  };

  const addItem = e => {
    e.preventDefault();

    if(enteredValue.name === ''){
      alert('Please enter a value')
    } else {
      const userToken = uuidv4(); 

      firestore.collection('shoppingList').add({
        name: enteredValue.name,
        lastPurchasedDate: enteredValue.lastPurchasedDate, // or null
        nextPurchase: enteredValue.nextPurchase,
        //! Add token to the db
        //! token: userToken
      });

      setEnteredValue(emptyShoppingItem);
    }
  };

  return (
    <div class="form">
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
            <option value="7" defaultValue>
              Soon
            </option>
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
