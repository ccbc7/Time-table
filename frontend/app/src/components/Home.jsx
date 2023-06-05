// import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
// import { auth, provider } from "../utils/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useState } from "react";
// import firebaseError from "./firebaseError";

// function Home() {
//   const [user] = useAuthState(auth); // ユーザーのログイン状態を取得する
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const signInWithGoogle = () => {
//     signInWithPopup(auth, provider);
//   };

//   const signInWithEmail = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (e) {
//       // setError(e.message); // エラーメッセージを設定します
//       setError(firebaseError(e, "signup"));
//       // setError(getErrorMessage(e.code));
//     }
//   };

//   return (
//     <div className="">
//       {user ? (
//         <>
//           <UserInfo />
//           <SignOutButton />
//         </>
//       ) : (
//         <>
//           <SignInButton signInWithGoogle={signInWithGoogle} />
//           <div className="flex flex-col space-y-4">
//             <input
//               type="text"
//               placeholder="Email"
//               onChange={e => setEmail(e.target.value)}
//               className="border p-2 rounded-md"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               onChange={e => setPassword(e.target.value)}
//               className="border p-2 rounded-md"
//             />
//             <button
//               onClick={signInWithEmail}
//               className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg"
//             >
//               Emailでサインイン
//             </button>
//             {error && <p className="text-red-500">{error}</p>}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Home;

// function SignInButton({signInWithGoogle}) {
//   return (
//     <button
//       onClick={signInWithGoogle}
//       className=" px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg"
//     >
//       グーグルでサインイン
//     </button>
//   );
// }

// function SignOutButton() {
//   return (
//     <button
//       onClick={() => auth.signOut()}
//       className=" px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg"
//     >
//       サインアウト
//     </button>
//   );
// }

// function UserInfo() {
//   return (
//     <div className="flex items-center space-x-4 justify-center">
//       <img src={auth.currentUser.photoURL} alt="user" className="h-10 w-10 rounded-full" />
//       <p className="text-lg font-bold">{auth.currentUser.displayName}</p>
//     </div>
//   );
// }




import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { provider } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import getFirebaseErrorMessage from "./firebaseError";
import { auth } from "../utils/firebase"; 

function Home() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const signInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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

  return (
    <div className="">
      {user ? (
        <>
          <UserInfo />
          <SignOutButton />
        </>
      ) : (
        <>
          <SignInButton signInWithGoogle={signInWithGoogle} />
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
              Emailでサインイン
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;

function SignInButton({ signInWithGoogle }) {
  return (
    <button
      onClick={signInWithGoogle}
      className=" px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg"
    >
      グーグルでサインイン
    </button>
  );
}

function SignOutButton() {
  return (
    <button
      onClick={() => auth.signOut()}
      className=" px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg"
    >
      サインアウト
    </button>
  );
}

function UserInfo() {
  return (
    <div className="flex items-center space-x-4 justify-center">
      <img
        src={auth.currentUser.photoURL}
        alt="user"
        className="h-10 w-10 rounded-full"
      />
      <p className="text-lg font-bold">{auth.currentUser.displayName}</p>
    </div>
  );
}
