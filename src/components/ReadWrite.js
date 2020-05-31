import React from 'react';
import { FirestoreCollection } from 'react-firestore';

export default function ReadWrite() {
  return (
    <div>
      <FirestoreCollection
        path="example"
        render={({ isLoading, data }) => {
          return isLoading ? (
            <p>loading...</p>
          ) : (
            <div>
              <h1>Messages</h1>
              <ul>
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
