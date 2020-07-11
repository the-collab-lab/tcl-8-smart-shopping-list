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

  //* Created two lists
  const inactiveList = [];
  const activeList = [];

  //* Used this function to divide active and inactive items
  filteredList.map(item => {
    let formatedLastPurchaseDate = dayjs.unix(
      item.lastPurchasedDate['seconds'],
    );
    let formatedToday = dayjs();
    let difference = formatedToday.diff(formatedLastPurchaseDate, 'd');
    if (
      item.numberOfPurchases <= 1 ||
      parseInt(difference) >= item.nextPurchase * 2
    ) {
      inactiveList.push(item)
    } else {
      activeList.push(item)
    }
  });


 //* Used this function to sort both the lists
  const lists = (arr) => {
    return arr.sort((a, b) => {
      if (a.nextPurchase === b.nextPurchase) {
        return a.name.localeCompare(b.name);
      }
      return a.nextPurchase > b.nextPurchase ? 1 : -1;
    });
  }

  const active = lists(activeList);
  const inactive = lists(inactiveList);

  //* Added active and inactive status to the items
  active.map(a => a['status'] = 'active')
  inactive.map(a => a['status'] = 'inactive')

  //* Concatenated both the arrays
  const list = [...active,...inactive]

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
                    {list.map(item => {
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
