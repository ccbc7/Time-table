import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuth } from "../utils/firebase";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(firebaseAuth);
    const unsubscribe = onAuthStateChanged(auth, (user) => { // onAuthStateChangedはユーザーのログイン状態が変更されるたびに呼び出される
      setUser(user);
      setLoading(false);
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  const value = { user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; // AuthContext.Providerは、渡された値をコンテキストの現在の値としてコンシューマーに渡す
}

export default AuthContext;
