import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import Header from "@/components/Header";
import useRequireLogin from "@/components/useRequireLogin";

const Users = () => {
  useRequireLogin();
  const [users, setUsers] = useState([]);
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const response = await axios.get(`/users?user_id=${user.uid}`);
        setUsers(response.data);
        setUserPhoto(user.photoURL);
      }
    });

      return () => unSub(); // Clean up
    }, []);


  return (
    <>
      <Header />
      <h1 className="text-3xl text-center font-bold">ユーザー情報</h1>
      <div className="my-4 flex justify-center">
        <table className="border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2 bg-violet-200">
                イメージ
              </th>
              <th className="border border-black px-4 py-2 bg-violet-200">
                ID
              </th>
              <th className="border border-black px-4 py-2 bg-violet-200">
                編集
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-black px-4 py-2">
                  <img
                    src={user.image_url}
                    alt={user.title}
                    className="h-32 rounded-full"
                  />
                </td>
                <td className="border border-black px-4 py-2">{user.id}</td>
                <td className="border border-black px-4 py-2">
                  <Link href={`user/edit/${user.id}`}>編集する</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
