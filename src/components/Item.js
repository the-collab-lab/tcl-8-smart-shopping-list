import React, { useState, useEffect } from 'react';
import '../styles/Item.css';

const Item = ({ item, handleChange }) => {
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
    let color = '';

    if (item.status === 'inactive') {
      color = '#747d8c';
    } else {
      if (item.nextPurchase <= 7) {
        color = '#eb2f06';
      } else if (item.nextPurchase > 7 && item.nextPurchase < 30) {
        color = '#eccc68';
      } else if (item.nextPurchase >= 30) {
        color = '#2ed573';
      }
    }
    return color;
  };

  return (
    <li
      className="list-item"
      style={{ backgroundColor: addNextPurchaseStyling(item) }}
    >
      <label>
        <input
          className="item-checkmark"
          type="checkbox"
          checked={checked}
          onChange={e => handleChange(e, item)}
        />
        <span className={className}>
          {item.name} - next purchase in {item.nextPurchase} days
        </span>
      </label>
    </li>
  );
};

export default Item;
