// import { useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../utils/firebase";
// import { useForm } from "react-hook-form";
// import Header from "@/components/Header";
// import UserInfo from "@/components/UserImage";
// import axios from "axios";

// function ProfileEdit() {
//   const [user] = useAuthState(auth);
//   const { register, handleSubmit, setValue } = useForm();

//   useEffect(() => {
//     if (user) {
//       // setValue("email", user.email);
//       // ここで他の初期値を設定できます
//       axios
//         .get(`/users/${user.uid}`) //
//         .then((res) => {
//           const userData = res.data;
//           setValue("username", user.displayName || "ユーザー");
//           if (userData.bio) {
//             setValue("bio", userData.bio);
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   }, [user, setValue]);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("username", data.username);
//       formData.append("icon", data.icon[0]);
//       formData.append("bio", data.bio);

//       const response = await axios.put(`/users/${user.uid}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
//         {/* <div className="max-w-md w-full space-y-8 -mt-40"> */}
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-8 -mt-20">
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 ">
//             プロフィール編集
//           </h2>
//           <div className="flex justify-center items-center">
//             <UserInfo />
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//             <input type="hidden" name="remember" defaultValue="true" />
//             <div className="rounded-md -space-y-px ">
//               <table className="w-full">
//                 <tbody>
//                   <tr>
//                     <th className="text-right pr-4 w-1/3">ユーザーネーム</th>
//                     <td>
//                       <input
//                         {...register("username")}
//                         id="username"
//                         name="username"
//                         type="text"
//                         autoComplete="username"
//                         required
//                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                         placeholder="ユーザー"
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-right pr-4">担当</th>
//                     <td>
//                       <input
//                         {...register("bio")}
//                         id="bio"
//                         name="bio"
//                         type="text"
//                         required
//                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                         placeholder="（例）6-1"
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-right pr-4">アイコン</th>
//                     <td>
//                       <input
//                         {...register("icon")}
//                         id="icon"
//                         name="icon"
//                         type="file"
//                         className="appearance-none rounded-none relative block w-full px-3 py-2"
//                       />
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 編集を保存
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProfileEdit;









// import { useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../utils/firebase";
// import { useForm } from "react-hook-form";
// import Header from "@/components/Header";
// import axios from "axios";

// function ProfileEdit() {
//   const [user] = useAuthState(auth);
//   const { register, handleSubmit, setValue } = useForm();

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`/users/${user.uid}`)
//         .then((res) => {
//           const userData = res.data;
//           setValue("username", user.username);
//           if (userData.bio) {
//             setValue("bio", userData.bio);
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   }, [user, setValue]);

//   const onSubmit = async (data) => {
//     try {
//         const formData = new FormData();
//         formData.append("user[username]", data.username);
//         formData.append("user[icon]", data.icon[0]);
//         formData.append("user[bio]", data.bio);
//         formData.append("user[firebase_uid]", user.uid);

//       const response = await axios.put(`/users/${user.uid}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-8 -mt-20">
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 ">
//             プロフィール編集
//           </h2>
//           <div className="flex justify-center items-center">
//             <img
//               src={userData.icon}
//               alt="ユーザーアイコン"
//               className="rounded-full w-24 h-24"
//             />
//             {user && user.photoURL ? (
//               <img
//                 src={user.photoURL}
//                 alt="ユーザーアイコン"
//                 className="rounded-full w-24 h-24"
//               />
//             ) : (
//               <div className="rounded-full w-24 h-24 bg-gray-200" />
//             )}
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//             <input type="hidden" name="remember" defaultValue="true" />
//             <div className="rounded-md -space-y-px ">
//               <table className="w-full">
//                 <tbody>
//                   <tr>
//                     <th className="text-right pr-4 w-1/3">ユーザーネーム</th>
//                     <td>
//                       <input
//                         {...register("username")}
//                         id="username"
//                         name="username"
//                         type="text"
//                         autoComplete="username"
//                         required
//                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:
// ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                         placeholder="ユーザー"
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-right pr-4">担当</th>
//                     <td>
//                       <input
//                         {...register("bio")}
//                         id="bio"
//                         name="bio"
//                         type="text"
//                         required
//                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                         placeholder="（例）6-1"
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="text-right pr-4">アイコン</th>
//                     <td>
//                       <input
//                         {...register("icon")}
//                         id="icon"
//                         name="icon"
//                         type="file"
//                         className="appearance-none rounded-none relative block w-full px-3 py-2"
//                       />
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 編集を保存
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProfileEdit;






// import { useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../utils/firebase";
// import { useForm } from "react-hook-form";
// import Header from "@/components/Header";
// import axios from "axios";
// import React, { useState } from "react";


// function ProfileEdit() {
//   const [username, setUsername] = useState("");
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("username", username);
//     formData.append("file", file);

//     try {
//       const response = await axios.post("/api/update-user", formData);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error uploading file: ", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="ユーザー名"
//       />
//       <input type="file" onChange={handleFileChange} />
//       <button type="submit">アップロード</button>
//     </form>
//   );
// }

// export default ProfileEdit;


// import axios from "axios";
// import { useState } from "react";
// import { auth } from "../utils/firebase";

// const UserImageUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const fileSelectedHandler = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();

//     if (!auth.currentUser) {
//       alert("Please sign in.");
//       return;
//     }

//     const fd = new FormData();
//     fd.append("user[image]", selectedFile, selectedFile.name);

//     await axios.put(`/users/${auth.currentUser.uid}`, fd);

//     setSelectedFile(null);
//   };

//   return (
//     <>
//       <input type="file" onChange={fileSelectedHandler} />
//       <button onClick={submitForm}>Upload</button>
//     </>
//   );
// };

// export default UserImageUpload;


import axios from "axios";
import { useState, useEffect } from "react";  // useEffectをインポート
import { auth } from "../utils/firebase";

const UserImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userImage, setUserImage] = useState(null);  // ユーザーの画像URLを保存するステートを作成

  useEffect(() => {
    // ユーザーの画像を取得するための関数を作成
    const fetchUserImage = async () => {
      if(auth.currentUser) {
        const response = await axios.get(`/users/${auth.currentUser.uid}`);
        setUserImage(response.data.image_url);
      }
    };

    // 関数を呼び出してユーザーの画像を取得
    fetchUserImage();
  }, [auth.currentUser]);  // auth.currentUserが変更されたときにこの関数を再度呼び出す

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Please sign in.");
      return;
    }

    const fd = new FormData();
    fd.append("user[image]", selectedFile, selectedFile.name);

    await axios.put(`/users/${auth.currentUser.uid}`, fd);

    // 画像をアップロードした後、新しい画像を取得
    const response = await axios.get(`/users/${auth.currentUser.uid}`);
    setUserImage(response.data.image_url);
    setSelectedFile(null);
  };

  return (
    <>
      <input type="file" onChange={fileSelectedHandler} />
      <button onClick={submitForm}>Upload</button>
      {userImage && <img src={userImage} alt="User" />}  {/* 画像が存在するときだけimgタグを表示 */}
    </>
  );
};

export default UserImageUpload;
