import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Item from './Item';
import Search from './Search';
import '../styles/List.css';

const List = ({ firestore }) => {
  const token = localStorage.getItem('userToken');
  const [inputText, setInputText] = useState('');

  let history = useHistory();
  const push = history.push;

  const handleClick = () => {
    push('/addItem');
  };

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

  const handleInputChange = e => {
    setInputText(e.target.value);
  };

  return (
    <>
      <FirestoreCollection
        path="shoppingList"
        filter={['token', '==', token]}
        render={({ isLoading, data, error }) => {
          return isLoading ? (
            <p>loading...</p>
          ) : (
            <div className="list">
              {error && <p>{error}</p>}
              {!data.length ? (
                <>
                  <p>
                    Press <b>'Add First Item'</b> to get started
                  </p>
                  <button onClick={handleClick}>Add First Item</button>
                </>
              ) : (
                <div>
                  <Search
                    handleInputChange={handleInputChange}
                    inputText={inputText}
                  />
                  <ul>
                    {data.map(item => {
                      const filteredItem = item.name
                        .toLowerCase()
                        .includes(inputText.toLowerCase());
                      return filteredItem ? (
                        <Item
                          key={item.id}
                          item={item}
                          handleChange={handleChange}
                        />
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        }}
      />
    </>
  );
};

export default withFirestore(List);
