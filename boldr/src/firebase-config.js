import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD-LrtA3qTeynuuSvyYgcIrcY35lSId0Wg",
    authDomain: "boldr-f2e1c.firebaseapp.com",
    databaseURL: "https://boldr-f2e1c-default-rtdb.firebaseio.com",
    projectId: "boldr-f2e1c",
    storageBucket: "boldr-f2e1c.appspot.com",
    messagingSenderId: "532041021603",
    appId: "1:532041021603:web:703553aa898eb522cc2716"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);
//enableLogging(true, false);

export { db, app, storage, auth };