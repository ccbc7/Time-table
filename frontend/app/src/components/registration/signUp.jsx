import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import getFirebaseErrorMessage from "../firebaseError";
import { auth } from "../../utils/firebase";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const auth = getAuth(); //

  const signUpWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      const errorMessage = await getFirebaseErrorMessage(
        e,
        "signup",
        auth,
        email
      );
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded-md mx-2"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded-md mx-2"
      />
      <button
        onClick={signUpWithEmail}
        className="px-5 py-3 mx-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg"
      >
        Emailでサインアップ
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default SignUp;
