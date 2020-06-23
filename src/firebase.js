import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB-5hzRrndort4EaDHzaVeyBIr3TwxYvqo',
  authDomain: 'collab-lab-testing.firebaseapp.com',
  databaseURL: 'https://collab-lab-testing.firebaseio.com',
  projectId: 'collab-lab-testing',
  storageBucket: 'collab-lab-testing.appspot.com',
  messagingSenderId: '1064259130718',
  appId: '1:1064259130718:web:c054308c211a44be9e6bcf',
});

const db = firebaseApp.firestore();

export { db };
