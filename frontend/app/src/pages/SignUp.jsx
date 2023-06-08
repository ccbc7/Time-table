import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../utils/firebase";
import getFirebaseErrorMessage from "../components/firebaseError";
import { useAuthState } from "react-firebase-hooks/auth";
import AnonAuth from "../components/AnonAuth";
import Link from "next/link";
//import UserInfo, ProfileEditButton, AccountEditButton, SignOutButton from '../components/...';

function SignUp() {
  // const auth = getAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [user] = useAuthState(auth);

  const signUp = async () => {
    try {
      if (password !== confirmPassword) {
        setError("パスワードが一致しません。");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      alert("アカウントを作成しました。");
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {user ? (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <UserInfo />
        <div className="flex flex-col space-y-4 mt-4">
          <ProfileEditButton />
          <AccountEditButton />
          <SignOutButton />
        </div>
      </div>
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
              次に進む
            </button>
            {error && <p className="text-red-500">{error}</p>}
            <p className="border-b-2 py-6"></p>
            <AnonAuth />
            <p>
              すでにアカウントをお持ちですか？
              <span className="text-blue-500 cursor-pointer">
                <Link href="/Home">サインイン</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      )}
    </div>
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
      onClick={() => console.log("Profile Edit Button Clicked")} // ここはプロフィール編集機能にリンクします
      className="flex-grow px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition duration-150 ease-in-out"
    >
      プロフィールを編集する
    </button>
  );
}

function AccountEditButton() {
  return (
    <button
      onClick={() => console.log("Account Edit Button Clicked")} // ここはプロフィール編集機能にリンクします
      className="flex-grow px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition duration-150 ease-in-out"
    >
      アカウントを編集する
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

export default SignUp;
