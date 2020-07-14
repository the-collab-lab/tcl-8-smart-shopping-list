import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Item from './Item';
import Search from './Search';
import '../styles/List.css';
import calculateEstimate from '../lib/estimates';
import secondsToDays from '../lib/secondsToDays';
import dayjs from 'dayjs';

const List = ({ firestore }) => {
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

  const handleInputChange = e => {
    setInputText(e.target.value);
  };

  const handleClearInput = () => {
    setInputText('');
  };

  return (
    <>
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
            <div className="list">
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
                  <ul>
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
            </div>
          );
        }}
      />
    </>
  );
};

export default withFirestore(List);
