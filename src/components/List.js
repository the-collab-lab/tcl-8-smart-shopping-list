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
    // TODO: Need to conditionally render the checkbox based on the lastPurchasedDate
    <FirestoreCollection
      path="shoppingList"
      filter={['token', '==', token]}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <p>loading...</p>
        ) : (
          <div className="list">
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
