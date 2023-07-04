import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import Header from "@/components/Header";

const ReservationAll = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async (userId) => {
      const response = await axios.get(`/reservations?user_id=${userId}`);
      setReservations(response.data);
      console.log(response.data);
    };

    const unSub = auth.onAuthStateChanged((user) => {
      if (user) fetchReservations(user.uid);
    });

    return () => unSub();
  }, []);

  const deleteReservation = async (id) => {
    if (window.confirm("本当に削除しますか？")) {
      const userId = auth.currentUser.uid;
      await axios.delete(`/reservations/${id}`, { data: { user_id: userId } });
      setReservations(reservations.filter((reservation) => reservation.id !== id));
    }
  };

  return (
    <>
      <Header />
      <h1 className="text-3xl text-center font-bold">予約確認</h1>
      <p className="text-center border-b my-3">◆あなたの予約した内容が確認できます。</p>
      <div className="my-4 flex justify-center">
        <table>
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-emerald-200">
                ID
              </th>
              <th className="border px-4 py-2 bg-emerald-200">
                施設ID
              </th>
              <th className="border px-4 py-2 bg-emerald-200">
                イメージ
              </th>
              <th className="border px-4 py-2 bg-emerald-200">
                施設名
              </th>
              <th className="border px-4 py-2 bg-emerald-200">
                予約者
              </th>
              <th className="border px-4 py-2 bg-emerald-200">
                使用者
              </th>
              <th className="border px-4 py-2 bg-emerald-200">
                用途
              </th>
              <th className="border px-4 py-2 bg-emerald-200">
                予約日
              </th>
              <th className="border px-4 py-2 bg-emerald-200">
                予約時限
              </th>
              <th className="border px-4 py-2 bg-emerald-200">
                予約作成日時
              </th>
              <th className="borde  px-4 py-2 bg-emerald-200">
                削除
              </th>
              <th className="border px-4 py-2 bg-emerald-200">
                編集
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="border  px-4 py-2">
                  {reservation.id}
                </td>
                <td className="border  px-4 py-2">
                  {reservation.location?.id}
                </td>
                <td className="border  px-4 py-2">
                  <Link href={`location/confirm/${reservation.location?.id}`}>
                    <img
                      src={reservation.location?.image_url}
                      alt={reservation.title}
                      className="h-10"
                    />
                  </Link>
                </td>
                <td className="border  px-4 py-2">
                  {reservation.location?.location_name}
                </td>
                <td className="border  px-4 py-2">
                  {reservation.user?.username}
                </td>
                <td className="border  px-4 py-2">
                  {reservation.facility_user_name}
                </td>
                <td className="border  px-4 py-2">
                  {reservation.purpose}
                </td>
                <td className="border  px-4 py-2">
                  {reservation.date}
                </td>
                <td className="border  px-4 py-2">
                  {reservation.period}
                </td>
                <td className="border  px-4 py-2">
                  {new Intl.DateTimeFormat("ja-JP", {
                    dateStyle: "short",
                    timeStyle: "medium",
                  }).format(new Date(reservation.created_at))}
                </td>
                <td className="border  px-4 py-2">
                  <button onClick={() => deleteReservation(reservation.id)}>
                    削除
                  </button>
                </td>
                <td className="border  px-4 py-2">
                  <Link href={`reservation/edit/${reservation.id}`}>編集</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Link href="/locationAll">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded text-center">
            施設を予約する
          </button>
        </Link>
      </div>
    </>
  );
};

export default ReservationAll;
