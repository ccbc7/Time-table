import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import getFirebaseErrorMessage from '../firebaseError';
import { auth, provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
// import { useAuth } from "./AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const auth = getAuth();
  // const { user } = useAuth();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // ログイン成功時の処理
      })
      .catch((error) => {
        // ログイン失敗時のエラーハンドリング
        const errorMessage = getFirebaseErrorMessage(error, "signin", auth, email);
        setError(errorMessage);
      });
  };

  const signInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      const errorMessage = await getFirebaseErrorMessage(e, "signin", auth, email);
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded-md"
      />
      <button
        onClick={signInWithEmail}
        className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg"
      >
        Emailでログイン
      </button>
      {error && <p className="text-red-500">{error}</p>}

      <button onClick={signInWithGoogle}>Googleでログイン</button>
    </div>
  );
}

export default Login;
