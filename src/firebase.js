import firebase from 'firebase';
  
var firebaseConfig = {
    apiKey: "AIzaSyAPPU4kCZf9oRYRuYy_hFYx6DBwcRLSr4I",
    authDomain: "portfolio-d028c.firebaseapp.com",
    databaseURL: "https://portfolio-d028c-default-rtdb.firebaseio.com",
    projectId: "portfolio-d028c",
    storageBucket: "portfolio-d028c.appspot.com",
    messagingSenderId: "943977931501",
    appId: "1:943977931501:web:d633caf004ce1c0543a2e4",
    measurementId: "G-W5MXS2E2JG"
  };
    
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
  
export default db;