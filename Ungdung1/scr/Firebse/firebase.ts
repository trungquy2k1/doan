import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
export const firebaseConfig = {
    apiKey: 'AIzaSyCcdZr4DDyZBOuQn_LCN6hLnI5JFGEbM6M',
    authDomain: 'doan-a127c.firebaseapp.com',
    projectId: 'doan-a127c',
    storageBucket: 'doan-a127c.appspot.com',
    messagingSenderId: '66553430569',
    appId: '1:66553430569:web:a765d07d5fc0c1d8a89238',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);