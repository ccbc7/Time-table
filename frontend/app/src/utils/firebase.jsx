// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYCX8X85KMD6VLYtugbq694A28qvegPD4",
  authDomain: "fir-login-57018.firebaseapp.com",
  projectId: "fir-login-57018",
  storageBucket: "fir-login-57018.appspot.com",
  messagingSenderId: "883646653626",
  appId: "1:883646653626:web:be340704d7fc34ddb3ce83",
  measurementId: "G-05K3SMNPEH",
};

// Initialize Firebase only if not initialized yet
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const app = getApps()[0]; // Grab the already initialized app

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

export default app;
