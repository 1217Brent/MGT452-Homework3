// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIVL5AnhpEnMQHt-pgj20y70a0I1s3A5g",
  authDomain: "practice-31a93.firebaseapp.com",
  projectId: "practice-31a93",
  storageBucket: "practice-31a93.appspot.com", // <-- Fixed typo here
  messagingSenderId: "499218698735",
  appId: "1:499218698735:web:ac0139c2e236296a50661a",
  measurementId: "G-6BNGS6H01G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Only initialize analytics in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { analytics };