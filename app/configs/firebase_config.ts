// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY3Gf1rbyJVvuI-vXvhtT3n_Z4BhbDyec",
  authDomain: "expo-delivery-app.firebaseapp.com",
  projectId: "expo-delivery-app",
  storageBucket: "expo-delivery-app.appspot.com",
  messagingSenderId: "810422052235",
  appId: "1:810422052235:web:acf68826b2afe9ed61fb8e",
  measurementId: "G-C3LCGS6P1L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
// const analytics = getAnalytics(app);
