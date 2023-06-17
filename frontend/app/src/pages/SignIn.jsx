import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { provider } from "../utils/firebase";
import { useState, useEffect } from "react";
import getFirebaseErrorMessage from "../components/firebaseError";
import { auth } from "../utils/firebase";
import Link from "next/link";
import Header from "../components/Header";
import axios from "axios";

function SignIn() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userId = authUser.uid;
        try {
          const response = await axios.get(`/users/${userId}`);
          setUser({
            ...response.data,
            image_url: response.data.image_url || "/default_profile2.png",
          });
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.error("User not found");
            const newUser = {
              user_id: userId,
              // image: "/default_profile2.png",
            };
            const response = await axios.post("/users", newUser);
            setUser(response.data);
          } else {
            console.error(error);
          }
        }
      } else {
        setUser(null);
      }
    });

    return () => unSub();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert("ログイン成功");
      await sendUserIdToServer(result.user.uid);
    } catch (e) {
      const errorMessage = await getFirebaseErrorMessage(
        e,
        "signin",
        auth,
        email
      );
      setError(errorMessage);
    }
  };

  const signInWithEmail = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      alert("ログイン成功");
      await sendUserIdToServer(result.user.uid);
    } catch (e) {
      const errorMessage = await getFirebaseErrorMessage(
        e,
        "signin",
        auth,
        email
      );
      setError(errorMessage);
    }
  };

  const signInAsGuest = async () => {
    try {
      const result = await signInAnonymously(auth);
      alert("ゲストとしてログインしました");
      await sendUserIdToServer(result.user.uid);
    } catch (e) {
      const errorMessage = await getFirebaseErrorMessage(
        e,
        "signin",
        auth,
        email
      );
      setError(errorMessage);
    }
  };

  const sendUserIdToServer = async (userId) => {
    try {
      // const response = await axios.post("/users", { firebase_uid: userId });
      console.log(response.data);
      alert("送信しました");
    } catch (error) {
      console.error("Error sending user ID to server: ", error);
    }
  };

  // ... the rest of your code
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {user ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md -mt-80">
              <UserInfo />
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="Usernote" className="flex">
                  <button
                    onClick={() => console.log("Profile Edit Button Clicked")}
                    className="flex-grow px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition duration-150 ease-in-out"
                  >
                    プロフィールを編集する
                  </button>
                </Link>
                <AccountEditButton />
                <SignOutButton />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8">サインイン</h2>
            <div className="flex flex-col space-y-4 mt-8">
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
                className="px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Emailでサインイン
              </button>
              <p className="border-b-2 py-4"></p>
              <SignInButton signInWithGoogle={signInWithGoogle} />
              <button
                onClick={signInAsGuest}
                className="px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500"
              >
                ゲストとしてサインイン
              </button>
              <p>
                初めてご利用ですか？新規登録は
                <Link href="/SignUp" className="text-blue-700 cursor-pointer">
                  こちら
                </Link>
              </p>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SignIn;

function SignInButton({ signInWithGoogle }) {
  return (
    <button
      onClick={signInWithGoogle}
      className="w-full px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 mb-4"
    >
      グーグルでサインイン
    </button>
  );
}

function SignOutButton() {
  return (
    <button
      onClick={() => auth.signOut()}
      className="flex-grow px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out"
    >
      サインアウト
    </button>
  );
}

function UserInfo() {
  const photoUrl = auth.currentUser.photoURL || "/default_profile2.png";
  const displayName = auth.currentUser.displayName || "ユーザー";
  return (
    <div className="flex items-center space-x-4 justify-center">
      <img src={photoUrl} alt="user" className="h-10 w-10 rounded-full" />
      <p className="text-lg font-bold">ようこそ！ {displayName} さん</p>
    </div>
  );
}

function ProfileEditButton() {
  return (
    <button
      onClick={() => console.log("Profile Edit Button Clicked")}
      className="flex-grow px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out"
    >
      プロフィールを編集する
    </button>
  );
}

function AccountEditButton() {
  return (
    <Link href="/AccountEdit" className="flex">
      <button
        onClick={() => console.log("Account Edit Button Clicked")}
        className="flex-grow px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 transition duration-150 ease-in-out"
      >
        アカウント設定
      </button>
    </Link>
  );
}
