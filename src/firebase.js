import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDIYdDfqZAJ_BXyxtZL1gHBf5brDjOVQJA',
  authDomain: 'tcl-8-smart-shopping-lis-a6069.firebaseapp.com',
  databaseURL: 'https://tcl-8-smart-shopping-lis-a6069.firebaseio.com',
  projectId: 'tcl-8-smart-shopping-lis-a6069',
  storageBucket: 'tcl-8-smart-shopping-lis-a6069.appspot.com',
  messagingSenderId: '471591173463',
  appId: '1:471591173463:web:2981efcaef0dfe01939212',
});

const db = firebaseApp.firestore();

export { db };