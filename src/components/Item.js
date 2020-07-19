import React, { useState, useEffect } from 'react';
import '../styles/Item.css';
import close from '../assets/svg/close.svg'

const Item = ({ item, handleChange, deleteItem }) => {
  const [checked, setChecked] = useState(false);
  const className = checked ? 'completed' : '';

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
    <li className={`bg-transparent 
        hover:bg-teal-500 text-teal-700 
        font-semibold hover:text-white 
        py-2 px-4 border border-teal-500 
        hover:border-transparent rounded-lg
        block  ${addNextPurchaseStyling(item)}`}>
      <input
        className="checkbox"
        type="checkbox"
        checked={checked}
        onChange={e => handleChange(e, item)}
        id={item.id}
      />
      <label htmlFor={item.id} className={className}>
        {item.name} - next purchase in {item.nextPurchase} days
      </label>
      <button className="delete" onClick={() => deleteItem(item.id)}>
        X
      </button>
    </li>
  );
};

export default Item;
