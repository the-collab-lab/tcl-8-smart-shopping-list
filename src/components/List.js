import React, { Fragment } from 'react';
import { FirestoreCollection } from 'react-firestore';
import '../styles/List.css'

const List = () => {
  const token = localStorage.getItem('userToken');
  return (
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
                  <li key={item.id}>
                    <input type="checkbox" defaultChecked="true"/>
                    <span>{item.name} - next purchase in {item.nextPurchase} days </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      />
  );
};

export default List;
