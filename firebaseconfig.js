import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGbqVv64PxlOtvDZAdrq20_NJvw_OtZPM",
  authDomain: "rrgmoto-a2b1c.firebaseapp.com",
  projectId: "rrgmoto-a2b1c",
  storageBucket: "rrgmoto-a2b1c.appspot.com",
  messagingSenderId: "691626782121",
  appId: "1:691626782121:web:e224e942c50e466eb668b8",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

export { app };
