import * as firebase from 'firebase'
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyC8lz3Q8KK0-jHGsV9nINOi31b5uM0Zrqw",
    authDomain: "to-do-list-946c2.firebaseapp.com",
    databaseURL: "https://to-do-list-946c2.firebaseio.com",
    projectId: "to-do-list-946c2",
    storageBucket: "to-do-list-946c2.appspot.com",
    messagingSenderId: "375931717389",
    appId: "1:375931717389:web:f133b9d321edbf979fd244"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();