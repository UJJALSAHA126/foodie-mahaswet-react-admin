// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// console.log('first', process.env.REACT_APP_FIREBASE_API)

const firebaseConfig = {
    apiKey: process.env.local.REACT_APP_FIREBASE_API,
    authDomain: "testing-for-react.firebaseapp.com",
    databaseURL: "https://testing-for-react-default-rtdb.firebaseio.com",
    projectId: "testing-for-react",
    storageBucket: "testing-for-react.appspot.com",
    messagingSenderId: "439857693976",
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-6V301QN0QL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);