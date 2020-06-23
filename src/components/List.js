import React from 'react';
import { useHistory } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';

const List = () => {
  const token = localStorage.getItem('userToken');

  let history = useHistory();
  const push = history.push;

  const handleClick = () => {
    push('/addItem');
  };

  return (
    <>
      <FirestoreCollection
        path="shoppingList"
        filter={['token', '==', token]}
        render={({ isLoading, data }) => {
          return isLoading ? (
            <p>loading...</p>
          ) : (
            <div>
              {!data.length ? (
                <button onClick={handleClick}>Add First Item</button>
              ) : (
                <ul style={{ listStyleType: 'none' }}>
                  {data.map(item => (
                    <li key={item.id}>
                      {item.name} - next purchase in {item.nextPurchase} days
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }}
      />
    </>
  );
};

export default List;
