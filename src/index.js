import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';

const config = {
  apiKey: 'AIzaSyDIYdDfqZAJ_BXyxtZL1gHBf5brDjOVQJA',
  authDomain: 'tcl-8-smart-shopping-lis-a6069.firebaseapp.com',
  databaseURL: 'https://tcl-8-smart-shopping-lis-a6069.firebaseio.com',
  projectId: 'tcl-8-smart-shopping-lis-a6069',
  storageBucket: 'tcl-8-smart-shopping-lis-a6069.appspot.com',
  messagingSenderId: '471591173463',
  appId: '1:471591173463:web:2981efcaef0dfe01939212',
};

firebase.initializeApp(config);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


ReactDOM.render(
  <BrowserRouter>
    <FirestoreProvider firebase={firebase}>
      <App />
    </FirestoreProvider>
  </BrowserRouter>,
document.getElementById('root'),
);