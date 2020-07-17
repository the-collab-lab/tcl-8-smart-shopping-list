import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';
import './assets/main.css'


serviceWorker.unregister();

ReactDOM.render(
  <BrowserRouter>
    <FirestoreProvider firebase={firebase}>
      <App />
    </FirestoreProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
