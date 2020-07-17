import React, {useContext} from 'react';
import { ListContext } from '../context/ListContext';
import dayjs from 'dayjs';

const Header = () => {
  const { filteredList } = useContext(ListContext);

  const list = filteredList.map(item => console.log(item))

  filteredList.map(item => {
    let formatedLastPurchaseDate = dayjs.unix(
      item.lastPurchasedDate['seconds'],
    );
    let formatedToday = dayjs();
    let difference = formatedToday.diff(formatedLastPurchaseDate, 'd');

  });

  return (
    <div className="header" style={{display: 'flex', width: '100%', height: '100px', border: '1px solid gold'}}>

    <h1> Smart Shopping </h1>

    <p> Notification </p>

    </div>
  );
}

export default Header;
