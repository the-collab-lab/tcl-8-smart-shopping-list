import React, { useState, useEffect } from 'react';
import Modal from './Modal.js';
import '../styles/Item.css';
import dayjs from 'dayjs';

const Item = ({
  item,
  handleChange,
  deleteItem,
  showModal,
  setModalDisplay,
}) => {
  const [checked, setChecked] = useState(false);
  const className = checked ? 'completed' : '';
  const today = dayjs().format('d');
  const estimatedNextPurchaseDate = +today + item.nextPurchase;

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

  return (
    <>
      <li className="list-item">
        <label htmlFor={item.id} onClick={() => console.log('here')}>
          <input
            className="checkbox"
            type="checkbox"
            checked={checked}
            onChange={e => handleChange(e, item)}
            id={item.id}
          />
        </label>

        <span className={className} onClick={() => setModalDisplay(true)}>
          {item.name} - next purchase in {item.nextPurchase} days
        </span>

        <button className="delete" onClick={() => deleteItem(item.id)}>
          Delete
        </button>
      </li>
      {showModal && (
        <Modal setDisplay={setModalDisplay}>
          <h1>{item.name}</h1>
          <ul>
            <li>{item.nextPurchase}</li>
            <li>{item.lastPurchaseDate}</li>
            <li>{estimatedNextPurchaseDate} days until next purchase</li>
          </ul>
        </Modal>
      )}
    </>
  );
};

export default Item;
