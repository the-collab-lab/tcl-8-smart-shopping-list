import React from 'react';
import { FirestoreCollection } from 'react-firestore';

const List = () => {
  return (
    <>
      <FirestoreCollection
        path="shoppingList"
        render={({ isLoading, data }) => {
          return isLoading ? (
            <p>loading...</p>
          ) : (
            <div>
              <ul style={{ listStyleType: 'none' }}>
                {data.map(item => (
                  <li key={item.id}>
                    {item.name} - next purchase in {item.nextPurchase} days
                  </li>
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
