// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { storage } from 'firebase/storage';
// import 'firebase/storage';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: 'AIzaSyCcdZr4DDyZBOuQn_LCN6hLnI5JFGEbM6M',
    authDomain: 'doan-a127c.firebaseapp.com',
    projectId: 'doan-a127c',
    storageBucket: 'doan-a127c.appspot.com',
    messagingSenderId: '66553430569',
    appId: '1:66553430569:web:a765d07d5fc0c1d8a89238',
};

export const app = initializeApp(firebaseConfig);
// Initialize Firebase

export const db = getFirestore(app);
// export const storageInstance = storage();
export const storage = getStorage(app);
export const auth = getAuth(app);
