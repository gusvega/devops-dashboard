import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "./config";

import { getAuth, createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)

const getFile = async () => {
   try {
     const fileRef = ref(storage, 'DevOps Engineer Resume.pdf');
     const fileUrl = await getDownloadURL(fileRef);
 
     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
     const response = await fetch(proxyUrl + fileUrl);
     const blob = await response.blob();
 
     const url = URL.createObjectURL(blob);
     const img = document.getElementById('myimg');
     img.setAttribute('src', url);
   } catch (error) {
     // Handle any errors
   }
 }


export { db, auth, getFile };

