import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDJa3fdP8TMhBVYCbuC-YzqqkqpfTneVcY',
  authDomain: 'notify-app-eea12.firebaseapp.com',
  projectId: 'notify-app-eea12',
  storageBucket: 'notify-app-eea12.appspot.com',
  messagingSenderId: '832279435998',
  appId: '1:832279435998:web:42e78e37a01524f3a3c04f',
  measurementId: 'G-PB0FZP9QNB'
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
