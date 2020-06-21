import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // apiKey: 'AIzaSyDIYdDfqZAJ_BXyxtZL1gHBf5brDjOVQJA',
  // authDomain: 'tcl-8-smart-shopping-lis-a6069.firebaseapp.com',
  // databaseURL: 'https://tcl-8-smart-shopping-lis-a6069.firebaseio.com',
  // projectId: 'tcl-8-smart-shopping-lis-a6069',
  // storageBucket: 'tcl-8-smart-shopping-lis-a6069.appspot.com',
  // messagingSenderId: '471591173463',
  // appId: '1:471591173463:web:2981efcaef0dfe01939212',

  apiKey: "AIzaSyA7inPAhY1nDezxRpyag6Ht7pMT7-vvKfo",
  authDomain: "temporary-a0728.firebaseapp.com",
  databaseURL: "https://temporary-a0728.firebaseio.com",
  projectId: "temporary-a0728",
  storageBucket: "temporary-a0728.appspot.com",
  messagingSenderId: "743045505807",
  appId: "1:743045505807:web:e75a64fc34ea3e19e9547a",
});

const db = firebaseApp.firestore();

export { db };