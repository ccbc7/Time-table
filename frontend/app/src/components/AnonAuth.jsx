import { getAuth, signInAnonymously } from "firebase/auth";

const AnonAuth = () => {
  const auth = getAuth();

  const handleSignInAnonymously = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      console.log("User signed in anonymously:", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in anonymously:", error);
    }
  };

  return (
    <button
      onClick={handleSignInAnonymously}
      className="px-5 py-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
    >
      ゲストとしてサインイン
    </button>
  );
};

export default AnonAuth;
