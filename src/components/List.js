import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Item from './Item';
import Modal from './Modal';
import Search from './Search';
import '../styles/List.css';
import calculateEstimate from '../lib/estimates';
import secondsToDays from '../lib/secondsToDays';

const List = ({ firestore }) => {
  const [showModal, setModalDisplay] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const token = localStorage.getItem('userToken');
  const [inputText, setInputText] = useState('');

  let history = useHistory();
  const push = history.push;

  const handleClick = () => {
    push('/addItem');
  };

  const handleChange = (e, item) => {
    const daysInterval = secondsToDays(
      Date.now() / 1000 - item.lastPurchasedDate['seconds'],
    );
    const weightedNextPurchaseEstimate = calculateEstimate(
      item.nextPurchase,
      daysInterval,
      item.numberOfPurchases,
    );

    const purchased = item.numberOfPurchases;
    // TODO: Need some error handling here to prevent user from unchecking and rechecking the box within 24
    // hours of last checked date
    if (e.target.checked) {
      firestore
        .collection('shoppingList')
        .doc(item.id)
        .update({
          numberOfPurchases: purchased + 1,
          lastPurchasedDate: new Date(),
          nextPurchase: weightedNextPurchaseEstimate,
        });
    }
  };

  const handleDelete = id => {
    setIdToDelete(id);
    setModalDisplay(true);
  };

  const deleteItem = async () => {
    await firestore
      .collection('shoppingList')
      .doc(idToDelete)
      .delete();

    setModalDisplay(false);
    setIdToDelete();
  };

  const handleInputChange = e => {
    setInputText(e.target.value);
  };

  const handleClearInput = () => {
    setInputText('');
  };

  return (
    <Fragment>
      <FirestoreCollection
        path="shoppingList"
        filter={['token', '==', token]}
        render={({ isLoading, data, error }) => {
          return isLoading ? (
            <p>loading...</p>
          ) : (
            <>
              {error && <p>{error}</p>}
              {!data.length ? (
                <>
                  <p>
                    Press <b>'Add First Item'</b> to get started
                  </p>
                  <button
                    className="add-first-item-button"
                    onClick={handleClick}
                  >
                    Add First Item
                  </button>
                </>
              ) : (
                <div className="search-container">
                  <Search
                    handleInputChange={handleInputChange}
                    handleClearInput={handleClearInput}
                    inputText={inputText}
                  />
                  <ul className="list">
                    {data.map(item => {
                      const filteredItem = item.name
                        .toLowerCase()
                        .includes(inputText.toLowerCase());
                      return filteredItem ? (
                        <Item
                          key={item.id}
                          item={item}
                          handleChange={handleChange}
                          deleteItem={() => handleDelete(item.id)}
                        />
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
            </>
          );
        }}
      />
      {showModal && (
        <Modal setDisplay={setModalDisplay}>
          <h1>Warning</h1>
          <p>Are you sure you want to delete this item?</p>
          <button onClick={() => deleteItem()}>Yes</button>
        </Modal>
      )}
    </Fragment>
  );
};

export default withFirestore(List);
