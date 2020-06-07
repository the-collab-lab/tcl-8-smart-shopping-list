import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';

const AddItem = props => {
  const { firestore } = props;
  const [enteredValue, setEnteredValue] = useState();

  const addMsg = e => {
    e.preventDefault();
    firestore.collection('example').add({
      msg: enteredValue,
    });
  };
  return (
    <>
      <form>
        <input
          title="message"
          type="text"
          name="msg"
          placeholder="enter your message here..."
          onChange={e => setEnteredValue(e.target.value)}
        />
        <button type="submit" onClick={e => addMsg(e)}>
          Submit
        </button>
      </form>
    </>
  );
};

export default withFirestore(AddItem);
