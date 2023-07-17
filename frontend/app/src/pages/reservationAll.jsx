import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import Header from "@/components/Header";
import Head from "next/head";
import Footer from "@/components/Footer";

const ReservationAll = () => {
  const [reservations, setReservations] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});

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
      setReservations(
        reservations.filter((reservation) => reservation.id !== id)
      );
    }
  };

  const handleDropdownClick = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Head>
        <title>予約確認</title>
      </Head>
      <Header />
      <h1 className="text-3xl text-center font-bold">予約確認</h1>
      <p className="text-center border-b my-3">
        ◆あなたの予約した内容が確認できます。
      </p>
      <div className="my-4 flex flex-col items-center sm:grid sm:grid-cols-1 sm:gap-2 mx-2 sm:max-w-4xl sm:mx-auto ">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="w-full sm:w-auto mb-4 sm:mb-0 border rounded-sm shadow-lg p-4 hover:ring-4 focus:ring focus:ring-violet-100"
          >
            <div
              onClick={() => handleDropdownClick(reservation.id)}
              className="cursor-pointer flex justify-between"
            >
              <div>
                {reservation.location?.location_name}
                <div>予約日: {reservation.date}</div>
                <div>予約時限: {reservation.period}</div>
              </div>
              <div className="w-1/3">
                <Link href={`location/confirm/${reservation.location?.id}`}>
                  <img
                    alt={reservation.title}
                    className="h-20 w-auto mx-auto object-cover rounded-md"
                  />
                </Link>
              </div>
            </div>
            {openDropdowns[reservation.id] && (
              <div className="mt-4">
                <div>予約者: {reservation.user?.username}</div>
                <div>使用者: {reservation.facility_user_name}</div>
                <div>用途: {reservation.purpose}</div>
                <div>
                  予約作成日時:{" "}
                  {new Intl.DateTimeFormat("ja-JP", {
                    dateStyle: "short",
                    timeStyle: "medium",
                  }).format(new Date(reservation.created_at))}
                </div>
                <div className="sm:border py-1 px-6 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-100 transition duration-200 ease-in-out shadow-sm my-2 text-center">
                  <button onClick={() => deleteReservation(reservation.id)}>
                    削除
                  </button>
                </div>
                <div className="sm:border py-1 px-6 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-100 transition duration-200 ease-in-out shadow-sm my-2 text-center">
                  <Link href={`reservation/edit/${reservation.id}`}>編集</Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/locationAll">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded text-center">
            施設を予約する
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ReservationAll;
