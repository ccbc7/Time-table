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
import { useRouter } from "next/router";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";

function SignIn() {
  const router = useRouter();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");

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
              username: "ユーザー",
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
      setModalTitle("ログイン成功");
      setModalDescription("グーグルアカウントでログインしました。");
      await sendUserIdToServer(result.user.uid);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 1000);
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
      setModalTitle("ログイン成功");
      setModalDescription("メールアドレスとパスワードでログインしました。");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 1000);
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
      setModalTitle("ログイン成功");
      setModalDescription("ゲストとしてログインしました。");
      await sendUserIdToServer(result.user.uid);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push("/profileEdit");
      }, 1000);
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
      const response = await axios.post("/users", { userId });
      console.log(response.data);
      alert("送信しました");
    } catch (error) {
      console.error("Error sending user ID to server: ", error);
    }
  };

  return (
    <>
      <Header />
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={modalTitle}
          description={modalDescription}
        />
      )}
      <div className="bg-gray-50 flex items-center justify-center pt-10">
        {user ? (
          <></>
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
                <Link href="/signUp" className="text-blue-700 cursor-pointer">
                  こちら
                </Link>
              </p>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        )}
      </div>
      <Footer />
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
