import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';

const tempConfig = {
  apiKey: 'AIzaSyD4ldHcZXlbmNFVu6YtBskH-vQve2gRIn8',
  authDomain: 'testproject-63838.firebaseapp.com',
  databaseURL: 'https://testproject-63838.firebaseio.com',
  projectId: 'testproject-63838',
  storageBucket: 'testproject-63838.appspot.com',
  messagingSenderId: '282733444013',
  appId: '1:282733444013:web:900af5c5dd1cf525',
};

firebase.initializeApp(tempConfig);
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
