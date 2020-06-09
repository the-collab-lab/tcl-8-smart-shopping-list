import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';

const AddItem = props => {
  const { firestore } = props;
  const [enteredValue, setEnteredValue] = useState({
    name: '',
    lastPurchasedDate: null,
    nextPurchase: '',
  });

  const handleChange = e => {
    console.log(enteredValue.name);
    setEnteredValue({ [e.target.name]: e.target.value });
  };

  const addMsg = e => {
    e.preventDefault();

    // firestore.collection('example').add({
    //   msg: enteredValue,
    // });

    firestore.collection('shoppingList').add({
      name: enteredValue.name,
      lastPurchasedDate: enteredValue.lastPurchasedDate, // or null
      nextPurchase: enteredValue.nextPurchase,
    });

    setEnteredValue('');
  };
  return (
    <>
      <form>
        <input
          title="shopping list item"
          type="text"
          name="name"
          placeholder="Eggs"
          onChange={handleChange}
          value={enteredValue.name}
        />
        <select
          type="text"
          name="lastPurchasedDate"
          value={enteredValue.lastPurchasedDate}
          onChange={handleChange}
        >
          <option value="7">Soon</option>
          <option value="14">Kind of Soon</option>
          <option value="30">Not soon</option>
        </select>

        <button type="submit" onClick={e => addMsg(e)}>
          Submit
        </button>
      </form>
    </>
  );
};

export default withFirestore(AddItem);
