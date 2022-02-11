import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD-LrtA3qTeynuuSvyYgcIrcY35lSId0Wg",
    authDomain: "boldr-f2e1c.firebaseapp.com",
    projectId: "boldr-f2e1c",
    storageBucket: "boldr-f2e1c.appspot.com",
    messagingSenderId: "532041021603",
    appId: "1:532041021603:web:703553aa898eb522cc2716"
};
  
const app = firebase.initializeApp(firebaseConfig);

export default app;