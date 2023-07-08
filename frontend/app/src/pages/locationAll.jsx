import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Head from "next/head";

const LocationAll = () => {
  const router = useRouter();
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState(router.query.q || "");

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await axios.get("/locations/all", {
        params: {
          q: {
            location_name_cont: searchQuery,
          },
        },
      });
      setLocations(response.data);
    };

    const unSub = auth.onAuthStateChanged((user) => {
      if (user) fetchLocations();
    });

    return () => unSub();
  }, [searchQuery]);

  return (
    <>
      <Head>
        <title>施設一覧</title>
      </Head>
      <Header />
      <h1 className="text-3xl text-center font-bold mt-3">施設一覧</h1>
      <p className="text-center my-3">◆予約する施設を選んでください</p>
      <div className="text-center border-b">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded my-3"
          placeholder="施設を検索"
        />
      </div>
      <div className="flex justify-center flex-wrap">
        {locations.map((location) => (
          <div key={location.id} className="mx-4 my-2">
            <Link
              href="/location/confirm/[id]"
              as={`/location/confirm/${location.id}`}
            >
              <img
                src={location.image_url}
                alt={location.title}
                className="w-32 h-24 object-cover object-center rounded-md hover:ring-4 ring-indigo-300 overflow-hidden transform transition-all duration-400 ease-in-out hover:scale-102"
              />
              <div className="text-center mt-2">
                <p>{location.location_name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/locationCreate">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded text-center">
            施設を登録する
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default LocationAll;
