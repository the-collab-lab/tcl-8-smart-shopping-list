import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase.js';

export const ListContext = createContext();

const ListContextProvider = props => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    db.collection('shoppingList')
      .get()
      .then(querySnapshot => {
        const itemList = querySnapshot.docs.map(doc => doc.data());
        setShoppingList(itemList);
        console.log(shoppingList);
      });
  }, []);

  console.log(shoppingList);

  return (
    <ListContext.Provider value={{ shoppingList }}>
      {props.children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
