import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDdmPX3kju6-iacfHfA016rs2uoPaxVGFQ",
    authDomain: "projetopp-741c1.firebaseapp.com",
    databaseURL: "https://projetopp-741c1-default-rtdb.firebaseio.com",
    projectId: "projetopp-741c1",
    storageBucket: "projetopp-741c1.appspot.com",
    messagingSenderId: "873404385280",
    appId: "1:873404385280:web:7af95755dc9cdccaf9f0e5",
    measurementId: "G-GCLLWDW9BH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore();
export const auth = getAuth();
export {app,firebaseConfig}
