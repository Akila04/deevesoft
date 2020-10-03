import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD6QKVdvyEoOZR8Ohneve3KAYfCP4Ap3gE",
    authDomain: "fir-login-d9854.firebaseapp.com",
    databaseURL: "https://fir-login-d9854.firebaseio.com",
    projectId: "fir-login-d9854",
    storageBucket: "fir-login-d9854.appspot.com",
    messagingSenderId: "905143821510",
    appId: "1:905143821510:web:d00699607f581a7abbe3c7"
};

const fire=firebase.initializeApp(firebaseConfig);

export default fire;
