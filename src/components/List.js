import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Item from './Item';
import '../styles/List.css';

const List = ({ firestore }) => {
  const token = localStorage.getItem('userToken');

  const handleChange = (e, item) => {
    const purchased = item.numberOfPurchases;
    // TODO: Need some error handling here
    if (e.target.checked) {
      firestore
        .collection('shoppingList')
        .doc(item.id)
        .update({
          numberOfPurchases: purchased + 1,
          lastPurchasedDate: new Date(),
        });
    }
  };
  return (
    <FirestoreCollection
      path="shoppingList"
      filter={['token', '==', token]}
      render={({ isLoading, data, error }) => {
        return isLoading ? (
          <p>loading...</p>
        ) : (
          <div className="list">
            {error && <p>{error}</p>}
            <ul style={{ listStyleType: 'none' }}>
              {data.map(item => (
                <Item key={item.id} item={item} handleChange={handleChange} />
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
};

export default withFirestore(List);
