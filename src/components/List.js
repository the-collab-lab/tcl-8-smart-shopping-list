import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Item from './Item';
import Modal from './Modal';
import Search from './Search';
import '../styles/List.css';
import calculateEstimate from '../lib/estimates';
import secondsToDays from '../lib/secondsToDays';
import dayjs from 'dayjs';

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
          const sortData = () => {
            //* Created two lists
            const inactiveList = [];
            const activeList = [];

            //* Used this function to divide active and inactive items
            data.forEach(item => {
              let formattedLastPurchaseDate = dayjs.unix(
                item.lastPurchasedDate['seconds'],
              );
              let formattedToday = dayjs();
              let difference = formattedToday.diff(
                formattedLastPurchaseDate,
                'd',
              );
              if (
                item.numberOfPurchases <= 1 ||
                +difference >= item.nextPurchase * 2
              ) {
                inactiveList.push(item);
              } else {
                activeList.push(item);
              }
            });

            //* Used this function to sort both the lists
            const lists = arr => {
              return arr.sort((a, b) => {
                if (a.nextPurchase === b.nextPurchase) {
                  return a.name.localeCompare(b.name);
                }
                return a.nextPurchase > b.nextPurchase ? 1 : -1;
              });
            };

            const active = lists(activeList);
            const inactive = lists(inactiveList);

            //* Added active and inactive status to the items
            active.forEach(a => (a['status'] = 'active'));
            inactive.forEach(a => (a['status'] = 'inactive'));

            //* Concatenated both the arrays
            return [...active, ...inactive];
          };
          const sortedList = sortData(data);
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
                  <ul className={'ul-items'}>
                    {sortedList.length > 0 ? (
                      sortedList.map(item => {
                        const filteredItem = item.name
                          .toLowerCase()
                          .includes(inputText.toLowerCase());
                        return (
                          filteredItem && (
                            <Item
                              key={item.id}
                              item={item}
                              handleChange={handleChange}
                              deleteItem={() => handleDelete(item.id)}
                            />
                          )
                        );
                      })
                    ) : (
                      <p>List is Currently Empty</p>
                    )}
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
