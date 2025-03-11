import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVmhrdeQ1ywcZzWdVsuiXIypymPHkaMWc",
  authDomain: "code-analyzer-8dfab.firebaseapp.com",
  projectId: "code-analyzer-8dfab",
  storageBucket: "code-analyzer-8dfab.firebasestorage.app",
  messagingSenderId: "956753356590",
  appId: "1:956753356590:web:733a3db452a5e48c36fcbf",
  measurementId: "G-BKRFWQEBZ1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const PROVIDER = new GoogleAuthProvider();

// This gives you a reference to the parent frame, i.e. the offscreen document.
// const PARENT_FRAME = document.location.ancestorOrigins[0];
const PARENT_FRAME = "*";  // Allow messages to be sent to any parent
console.log("Parent Frame URL:", PARENT_FRAME);
// yest

// fafa

function sendResponse(result) {
  window.parent.postMessage(JSON.stringify(result), PARENT_FRAME);
}


window.addEventListener("message", async function ({ data }) {
  if (data.initAuth) {
    try {
      const result = await signInWithPopup(auth, PROVIDER);
      const user = result.user;
      console.log("user detail fetched from hosted webPage" , user);
      if (user) {
        // Get the ID token
        const idToken = await user.getIdToken();
        console.log(idToken);
        // Send token to parent frame
        sendResponse({idToken, user });
      }
    } catch (error) {
      console.log("error fetch from hosted page !")
      sendResponse({ error: error.message });
    }
  }
});
