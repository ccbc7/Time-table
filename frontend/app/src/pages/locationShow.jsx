import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

const LocationsShow = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async (userId) => {
      const response = await axios.get(`/locations?user_id=${userId}`);
      setLocations(response.data);
    };

    const unSub = auth.onAuthStateChanged((user) => {
      if (user) fetchLocations(user.uid);
    });

    return () => unSub();
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
      <Head>
        <title>登録した施設</title>
      </Head>
      <Header />
      <h1 className="text-3xl text-center font-bold mt-3">登録した施設</h1>
      <p className="text-center border-b my-3">
        あなたが登録した施設を確認できます。
      </p>
      <div className="text-center">
        <Link href="/locationCreate">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded text-center">
            施設を登録する
          </button>
        </Link>
      </div>
      <div className="my-4 flex flex-col items-center sm:grid sm:grid-cols-4 sm:gap-2 mx-2">
        {locations.map((location) => (
          <div
            key={location.id}
            className="w-full sm:w-auto mb-4 sm:mb-0 border rounded-sm shadow-lg p-4"
          >
            <div className="mb-4">
              <img
                src={location.image_url}
                alt={location.title}
                className="h-32 w-auto mx-auto object-cover"
              />
            </div>
            <div className="mb-2 font-bold text-center">
              {location.location_name}
            </div>
            <div className="mb-2">ID: {location.id}</div>
            <div className="mb-2">登録ユーザー: {location.username}</div>
            <div className="mb-2">
              作成日時:{" "}
              {new Intl.DateTimeFormat("ja-JP", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(location.created_at))}
            </div>
            <div className="sm:border py-1 px-6 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-100 transition duration-200 ease-in-out shadow-sm my-2 text-center">
              <Link href={`/reservationCreate/${location.id}`}>予約する</Link>
            </div>
            <div className="sm:border py-1 px-6 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-100 transition duration-200 ease-in-out shadow-sm my-2 text-center">
              <button onClick={() => deleteLocation(location.id)}>
                削除する
              </button>
            </div>
            <div className="sm:border py-1 px-6 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-100 transition duration-200 ease-in-out shadow-sm my-2 text-center">
              <Link href={`location/edit/${location.id}`}>編集する</Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default LocationsShow;
