/**
 *    Name: Edale Miguel
 *    Date: November 28, 2024
 * 
 *    This file initializes the Firebase app and sets up Firebase Authentication and Firestore services. 
 *    It imports the necessary Firebase modules and configures them using a Firebase config object.
 *    This setup enables user authentication and data management features in the app, providing secure 
 *    access to user data and storage.
 */


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDffUq1Um-DdaHsFCmHlfOpcmhFwsji928",
  authDomain: "healthcaretracker-448eb.firebaseapp.com",
  projectId: "healthcaretracker-448eb",
  storageBucket: "healthcaretracker-448eb.firebasestorage.app",
  messagingSenderId: "167396290064",
  appId: "1:167396290064:web:28ca371a4a86a88b8a2495"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Firebase Authentication
const auth = getAuth(app);

// Export Firebase app, Firestore instance, and Auth instance
export { app, db, auth }; 

export default app;