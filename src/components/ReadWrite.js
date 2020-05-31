import React, { useState } from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';

function ReadWrite(props) {
  const { firestore } = props;
  const [enteredValue, setEnteredValue] = useState();

  const addMsg = e => {
    e.preventDefault();
    firestore.collection('example').add({
      msg: enteredValue,
    });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="msg"
          placeholder="enter your message here..."
          onChange={e => setEnteredValue(e.target.value)}
        />
        <button type="submit" onClick={e => addMsg(e)}>
          Submit
        </button>
      </form>
      <FirestoreCollection
        path="example"
        render={({ isLoading, data }) => {
          return isLoading ? (
            <p>loading...</p>
          ) : (
            <div>
              <h1>Messages</h1>
              <ul style={{ listStyleType: 'none' }}>
                {data.map(msg => (
                  <li key={msg.id}>{msg.msg}</li>
                ))}
              </ul>
            </div>
          );
        }}
      />
    </div>
  );
}

export default withFirestore(ReadWrite);
