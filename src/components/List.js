import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';

const List = () => {
  return (
    <>
      <FirestoreCollection
        path="example"
        render={({ isLoading, data }) => {
          return isLoading ? (
            <p>loading...</p>
          ) : (
            <div>
              <ul style={{ listStyleType: 'none' }}>
                {data.map(msg => (
                  <li key={msg.id}>{msg.msg}</li>
                ))}
              </ul>
            </div>
          );
        }}
      />
    </>
  );
};

export default List;
