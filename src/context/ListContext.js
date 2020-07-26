import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase.js';

export const ListContext = createContext();

const ListContextProvider = props => {
  const [shoppingList, setShoppingList] = useState([]);
  const token = localStorage.getItem('userToken');

  const filteredList = shoppingList.filter(item => item.token === token);

  useEffect(() => {
    db.collection('shoppingList').onSnapshot(snapshot => {
      const itemList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShoppingList(itemList);
    });

  }, []);

  return (
    <ListContext.Provider value={{ shoppingList, filteredList }}>
      {props.children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
