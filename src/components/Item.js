import React, { useState, useEffect } from 'react';
import Modal from './Modal.js';
import '../styles/Item.css';
import dayjs from 'dayjs';

const Item = ({ item, handleChange, deleteItem }) => {
  const [checked, setChecked] = useState(false);
  const [showItemInfo, setShowItemInfo] = useState(false);
  const className = checked ? 'completed' : '';

  // USE IF NEED DATE FOR NEXT PURCHASE DATE
  // const today = dayjs().format('d');
  // const estimatedNextPurchaseDate = +today + item.nextPurchase;

  const lastPurchasedDate = dayjs
    .unix(item.lastPurchasedDate['seconds'])
    .format('M/DD/YYYY');

  useEffect(() => {
    const checkDate = () => {
      // Current date in seconds
      const now = Date.now() / 1000;
      // Number of seconds in a day
      const oneDay = 60 * 60 * 24;
      // Checks to see if the number of seconds that have elapsed since
      // the last purchased date is less than one day
      // only display item if lastPurchasedDate field exists
      if (item.lastPurchasedDate) {
        const isChecked = now - item.lastPurchasedDate.seconds < oneDay;
        return isChecked;
      }
    };
    // check whether item should be checked
    const check = checkDate(item);
    setChecked(check);
  }, [item]);

  const handleModalChange = () => {
    setShowItemInfo(true);
  };

  const addNextPurchaseStyling = item => {
    let className = '';

    if (item.status === 'inactive') {
      className = 'inactive-color';
    } else {
      if (item.nextPurchase <= 7) {
        className = 'soon-color';
      } else if (item.nextPurchase > 7 && item.nextPurchase < 30) {
        className = 'kind-of-soon-color';
      } else if (item.nextPurchase >= 30) {
        className = 'not-soon-color';
      }
    }
    return className;
  };

  return (
    <li
      className={`list-item  
     text-teal-700 
    font-semibold 
    py-2 px-4 border border-teal-500 
    hover:border-transparent rounded-lg
    block  ${addNextPurchaseStyling(item)}`}
    >
      <label htmlFor={item.id}>
        <input
          className="checkbox"
          type="checkbox"
          checked={checked}
          onChange={e => handleChange(e, item)}
          id={item.id}
        />
      </label>

      <span className={className} onClick={handleModalChange}>
        {item.name}
      </span>

      <button className="delete" onClick={() => deleteItem(item.id)}>
        Delete
      </button>
      {showItemInfo && (
        <Modal setDisplay={setShowItemInfo}>
          <h2>{item.name}</h2>
          <ul>
            <li>Last purchased on {lastPurchasedDate}</li>
            <li>
              {item.nextPurchase > 1
                ? `Next purchase in ${item.nextPurchase} days`
                : `Next purchase in ${item.nextPurchase} day`}
            </li>
            <li>
              {item.numberOfPurchases > 1
                ? `Previously purchased ${item.numberOfPurchases} times`
                : `Previously purchased once`}
            </li>
          </ul>
        </Modal>
      )}
    </li>
  );
};

export default Item;
