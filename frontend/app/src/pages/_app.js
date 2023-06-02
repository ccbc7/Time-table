import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import axios from "axios";
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL; //.envで設定した環境変数を参照
axios.defaults.withCredentials = true;



// import initFirebase from "../utils/firebaseClient";
// import { subscribeToAuthChanges, logout } from "../utils/auth";

// Initialize Firebase
// initFirebase();
// function App({ Component, pageProps }) {
  //   const [user, setUser] = useState(null);

//   useEffect(() => {
//     return subscribeToAuthChanges(setUser);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       // ログアウト成功時の処理をここに書く
//     } catch (error) {
//       console.error(error);
//       // ログアウト失敗時の処理をここに書く
//     }
//   };

//   if (user) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
//         <p className="text-center text-2xl font-bold text-gray-800">
//           Welcome, {user.email}
//         </p>
//         <button
//           className="mx-auto mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           onClick={handleLogout}
//         >
//           Log out
//         </button>
//         <Component {...pageProps} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
//       <Component {...pageProps} />
//     </div>
//   );
// }

// export default App;
