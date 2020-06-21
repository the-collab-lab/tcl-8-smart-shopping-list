import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';

var config = {
  apiKey: 'AIzaSyA7inPAhY1nDezxRpyag6Ht7pMT7-vvKfo',
  authDomain: 'temporary-a0728.firebaseapp.com',
  databaseURL: 'https://temporary-a0728.firebaseio.com',
  projectId: 'temporary-a0728',
  storageBucket: 'temporary-a0728.appspot.com',
  messagingSenderId: '743045505807',
  appId: '1:743045505807:web:e75a64fc34ea3e19e9547a',
  measurementId: 'G-TN3WQCF659',
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
