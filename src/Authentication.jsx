import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "./Firebase";

const auth = getAuth(app);

const Authentication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const PARENT_FRAME = document.location.ancestorOrigins[0];

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await signOut(auth); // Ensure fresh login
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user) throw new Error("No user data received");
      const idToken = await user.getIdToken();
      if (idToken) {
        window.opener?.postMessage({ idToken }, "*");
      }
      function sendResponse(result) {
        window.parent.postMessage(JSON.stringify(result), PARENT_FRAME);
      }
      window.addEventListener('message', function({data}) {
        if (data.initAuth) {
          signInWithPopup(auth, PROVIDER)
            .then(sendResponse)
            .catch(sendResponse);
        }
      });
    } catch (error) {
      setError(error.message);
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    </div>
  );
};

export default Authentication;
