import { signInWithPopup } from "firebase/auth";
// import { signInWithGoogle } from "../firebase";
import { auth, provider } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Home() {
  const [user] = useAuthState(auth); // ユーザーのログイン状態を取得する
  return (
    <div className="flex items-center justify-center h-screen">
      {user? (
        <>
          <UserInfo />
          <SignOutButton />
        </>
      ) : ( // ログインしていない場合はサインインボタンを表示する
      <SignInButton />
      )}
    </div>
  );
}

export default Home;

function SignInButton() {
  const signInWithGoogle = () => {
    //firebaseを使ってグーグルでサインインする
    signInWithPopup(auth, provider);
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg"
    >
      グーグルでサインイン
    </button>
  );
}

//サインアウト
function SignOutButton() {
  return (
    <button
      onClick={() => auth.signOut()}
      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg"
    >
      グーグルでサインアウト
    </button>
  );
}

//ユーザー情報
function UserInfo() {
  return (
    <>
      <div className="flex justify-center">
        <img src={auth.currentUser.photoURL} alt="user" />
        <p>{auth.currentUser.displayName}</p>
      </div>
    </>
  );
}
