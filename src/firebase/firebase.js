import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs,onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCh-Dq07x2LhQQckEE-QCf7RPKlqs4DV6w",
    authDomain: "fir-login-9c872.firebaseapp.com",
    databaseURL: "https://fir-login-9c872-default-rtdb.firebaseio.com",
    projectId: "fir-login-9c872",
    storageBucket: "fir-login-9c872.appspot.com",
    messagingSenderId: "411249060600",
    appId: "1:411249060600:web:3d5007178a5a446ddb290d",
    measurementId: "G-94BJ0XSHDS"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc, getDocs, ref, uploadBytes, getDownloadURL,onSnapshot };

