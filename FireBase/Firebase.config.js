import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyAFZW0gDgpSekpfwgdMD-2Vs6BpQfBUQoQ",
  authDomain: "portfolio-2e9be.firebaseapp.com",
  projectId: "portfolio-2e9be",
  storageBucket: "portfolio-2e9be.firebasestorage.app",
  messagingSenderId: "109665724909",
  appId: "1:109665724909:web:27aeb9fc74fe73b87f5fe4",
  measurementId: "G-3RNH1F6L49"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database
export const db = getDatabase(app);
