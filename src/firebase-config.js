// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDZFy3EfjfgAc-yZflb7nY_xPWohp4YAeU",
//   authDomain: "lucid2.firebaseapp.com",
//   databaseURL: "https://lucid2-default-rtdb.firebaseio.com",
//   projectId: "lucid2",
//   storageBucket: "lucid2.appspot.com",
//   messagingSenderId: "923703763850",
//   appId: "1:923703763850:web:6c32bfbf971262299a5e73",
//   measurementId: "G-YL0776R1ES",
// };

//mirats fulcrum:
const firebaseConfig = {
  apiKey: "AIzaSyCS7dlm0sBnBPI22QaI3j_fAhw28mFJpSw",
  authDomain: "mirats-fulcrum.firebaseapp.com",
  databaseURL: "https://mirats-fulcrum.firebaseio.com",
  projectId: "mirats-fulcrum",
  storageBucket: "mirats-fulcrum.appspot.com",
  messagingSenderId: "759155739902",
  appId: "1:759155739902:web:a3b07292126dd4e6c429af",
  measurementId: "G-ZRXJL491DX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoredb = getFirestore(app);
export const storage = getStorage(app);
export default app;
