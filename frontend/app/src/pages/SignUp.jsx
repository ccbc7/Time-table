import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../utils/firebase";
import getFirebaseErrorMessage from "../components/FirebaseError";
import { useAuthState } from "react-firebase-hooks/auth";
import AnonAuth from "../components/AnonAuth";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";
import { useEffect } from "react";
import Header from "@/components/Header";

function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [user] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    return () => {
      setShowModal(false);
    };
  }, []);

  const signUp = async () => {
    try {
      if (password !== confirmPassword) {
        setError("パスワードが一致しません。");
        return;
      }
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUid = result.user.uid;
    await axios.post("/users", {
      firebase_uid: firebaseUid,
      username: "ユーザー",
      user_id: firebaseUid,
    });
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      router.push("/ProfileEdit");
    }, 1000);
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
    <>
      <Header />
      {showModal && (
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="アカウント作成成功"
        description="アカウントの作成が成功しました"
      />
      )}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {user ? (
          <>
          </>
        ) : (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-3xl font-bold text-center mb-8">
                アカウントを作成
              </h2>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="メールアドレス"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded-md"
                />
                <input
                  type="password"
                  placeholder="パスワードは６文字以上必要です"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded-md"
                />
                <input
                  type="password"
                  placeholder="もう一度パスワードを入力してください"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border p-2 rounded-md"
                />
                <button
                  onClick={signUp}
                  className="px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  登録する
                </button>
                {error && <p className="text-red-500">{error}</p>}
                <p className="border-b-2 py-6"></p>
                <AnonAuth />
                <p>
                  すでにアカウントをお持ちですか？
                  <span className="text-blue-500 cursor-pointer">
                    <Link href="/SignIn">サインイン</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SignUp;
