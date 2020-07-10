import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Item from './Item';
import Search from './Search';
import '../styles/List.css';
import calculateEstimate from '../lib/estimates';
import secondsToDays from '../lib/secondsToDays';
import { ListContext } from '../context/ListContext';
import dayjs from 'dayjs';

const List = ({ firestore }) => {
  const token = localStorage.getItem('userToken');
  const [inputText, setInputText] = useState('');
  const [categorizedItems, setCategorizedItems] = useState('');

  const { filteredList } = useContext(ListContext);

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

  const handleInputChange = e => {
    setInputText(e.target.value);
  };

  const handleClearInput = () => {
    setInputText('');
  };

  // useEffect(() => {
  const list = filteredList.sort((a, b) => {
    if (a.nextPurchase === b.nextPurchase) {
      return a.name.localeCompare(b.name);
    }
    return a.nextPurchase > b.nextPurchase ? 1 : -1;
  });
  // setCategorizedItems(list)
  // })

  //item is inactive if numberOfPurchases <= 1
  //item is also inactive if elapsed time(difference between now and lastPurchaseDate) = nextPurchase * 2
  const inactiveItems = list.filter(item => {
    let formatedLastPurchaseDate = dayjs.unix(
      item.lastPurchasedDate['seconds'],
    );
    let formatedToday = dayjs();
    let difference = formatedToday.diff(formatedLastPurchaseDate, 'd');
    if (
      item.numberOfPurchases <= 1 ||
      parseInt(difference) >= item.nextPurchase * 2
    ) {
      return item;
    }
  });

  console.log('inactive Items:', inactiveItems);

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
                    {data.map(item => {
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
