import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbKrzJDBEZalxL3qau4fpTVp7Vih2RZWw",
  authDomain: "digital-voting-system-b6924.firebaseapp.com",
  projectId: "digital-voting-system-b6924",
  storageBucket: "digital-voting-system-b6924.appspot.com",
  messagingSenderId: "302958651096",
  appId: "1:302958651096:web:54140f7ec18d8f1d2859ad",
  measurementId: "G-PEW8H463YY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth= getAuth();
export const voteImg=getStorage(app);
export const textDB=getFirestore(app);
export const candidateDB=getFirestore(app);
export const voteDB=getFirestore(app);

export default app;