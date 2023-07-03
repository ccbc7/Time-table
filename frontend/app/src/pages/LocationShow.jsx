import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import Header from "@/components/Header";

const locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async (userId) => {
      const response = await axios.get(`/locations?user_id=${userId}`);
      setLocations(response.data);
    };

    const unSub = auth.onAuthStateChanged((user) => {
      if (user) fetchLocations(user.uid); // ログインしている場合はノートを取得
    });

    return () => unSub(); // Clean up
  }, []);

  const deleteLocation = async (id) => {
    if (window.confirm("本当に削除しますか？")) {
      const userId = auth.currentUser.uid;
      await axios.delete(`/locations/${id}`, { data: { user_id: userId } });
      setLocations(locations.filter((location) => location.id !== id));
    }
  };

  return (
    <>
      <Header />
      <h1 className="text-3xl text-center font-bold">登録した施設</h1>
      <div className="my-4 flex justify-center">
        <table className="">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-violet-200">
                ID
              </th>
              <th className="border px-4 py-2 bg-violet-200">
                イメージ
              </th>
              <th className="border px-4 py-2 bg-violet-200">
                施設名
              </th>
              <th className="border px-4 py-2 bg-violet-200">
                登録ユーザー
              </th>
              <th className="border px-4 py-2 bg-violet-200">
                作成日時
              </th>
              <th className="border px-4 py-2 bg-violet-200">
                予約する
              </th>
              <th className="border px-4 py-2 bg-violet-200">
                削除する
              </th>
              <th className="border px-4 py-2 bg-violet-200">
                編集する
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {locations.map((location) => (
              <tr key={location.id}>
                <td className="border  px-4 py-2">{location.id}</td>
                <td className="border  px-4 py-2">
                  <img
                    src={location.image_url}
                    alt={location.title}
                    className="h-10"
                  />
                </td>
                <td className="border  px-4 py-2">
                  {location.location_name}
                </td>
                <td className="border  px-4 py-2">
                  {location.username}
                </td>
                <td className="border  px-4 py-2">
                  {new Intl.DateTimeFormat("ja-JP", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(location.created_at))}
                </td>
                <td className="border  px-4 py-2">
                  <Link href={`/ReservationCreate/${location.id}`}>予約</Link>
                </td>
                <td className="border  px-4 py-2">
                  <button onClick={() => deleteLocation(location.id)}>
                    削除
                  </button>
                </td>
                <td className="border  px-4 py-2">
                  <Link href={`Location/edit/${location.id}`}>編集</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Link href="/LocationCreate">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded text-center">
            施設を登録する
          </button>
        </Link>
      </div>
    </>
  );
};

export default locations;
