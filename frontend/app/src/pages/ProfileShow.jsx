// import { useState, useEffect } from "react";
// import { auth } from "../utils/firebase";
// import Header from "@/components/Header";
// import Link from "next/link";
// import axios from "axios";

// function ProfileShow() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {

//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         if (user.isAnonymous) {
//           setUser({
//             displayName: "ユーザー",
//             email: null,
//             photoURL: "/default_profile2.png",
//           });
//         } else {
//           setUser({
//             displayName: user.displayName || "ユーザー",
//             email: user.email,
//             photoURL: user.photoURL || "/default_profile2.png",
//           });
//         }
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   if (!user) {
//     return <div>ユーザー情報を読み込み中...</div>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col justify-center items-center min-h-screen">
//         <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
//           <div className="flex flex-col items-center">
//             <img
//               className="h-24 w-24 rounded-full"
//               src={user.photoURL}
//               alt="Profile"
//             />
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//               {user.displayName}
//             </h2>
//           </div>
//           <div className="mt-8 space-y-6">
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div className="mt-4">
//                 <p className="text-sm font-medium text-gray-700">User ID</p>
//                 <p className="mt-1 text-sm text-gray-900">
//                   {user.firebase_uid}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-700">
//                   メールアドレス
//                 </p>
//                 <p className="mt-1 text-sm text-gray-900">
//                   {user.email ? user.email : "*ゲストモードです"}
//                 </p>
//               </div>
//               <div className="mt-4">
//                 <p className="text-sm font-medium text-gray-700">自己紹介</p>
//                 <p className="mt-1 text-sm text-gray-900"></p>
//               </div>
//             </div>



import { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import Header from "@/components/Header";
import Link from "next/link";
import axios from "axios";

function ProfileShow() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.isAnonymous) {
          setUser({
            displayName: "ユーザー",
            email: null,
            photoURL: "/default_profile2.png",
          });
        } else {
          setUser({
            displayName: user.displayName || "ユーザー",
            email: user.email,
            photoURL: user.photoURL || "/default_profile2.png",
          });

          // ユーザーのfirebase_uidを取得する
          axios
            .get(`/users/${user.uid}`)
            .then((res) => {
              const userData = res.data;

              // firebase_uidが存在する場合はそれをstateに保存
              if (userData.firebase_uid) {
                setUser((prevUser) => ({
                  ...prevUser,
                  firebase_uid: userData.firebase_uid,
                }));
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div>ユーザー情報を読み込み中...</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div className="flex flex-col items-center">
            <img
              className="h-24 w-24 rounded-full"
              src={user.photoURL}
              alt="Profile"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {user.displayName}
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  メールアドレス
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {user.email ? user.email : "*ゲストモードです"}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">自己紹介</p>
                <p className="mt-1 text-sm text-gray-900"></p>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">User ID</p>
                <p className="mt-1 text-sm text-gray-900">
                  {user.firebase_uid}
                </p>
              </div>
            </div>
            <div>
              <Link href="/ProfileEdit">
                <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  プロフィールを編集する
                </button>
              </Link>
              <button className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                アカウントを編集する
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileShow;
