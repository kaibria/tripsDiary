// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxtTF29DbUZXsi-ZP1O7txYWOhykXrnVg",
    authDomain: "reisetagebuch-65aa5.firebaseapp.com",
    databaseURL: "https://reisetagebuch-65aa5-default-rtdb.firebaseio.com",
    projectId: "reisetagebuch-65aa5",
    storageBucket: "reisetagebuch-65aa5.appspot.com",
    messagingSenderId: "104726006389",
    appId: "1:104726006389:web:90af69ae1a4b7fc8bac63c",
    measurementId: "G-XJ6K1RVZ12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);