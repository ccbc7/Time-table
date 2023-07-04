import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Link from "next/link";
import Calendar from "@/components/Calendar";
import CommentView from "@/components/CommentView";

const LocationConfirm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [reservations, setReservations] = useState([]);
  const [location, setLocation] = useState(null);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const fetchLocationAndReservations = async () => {
      const locationResponse = await axios.get(`/locations/${id}`);
      setLocation(locationResponse.data);

      const reservationsResponse = await axios.get(
        `/reservations?location_id=${id}`
      );
      setReservations(reservationsResponse.data);
    };

    if (id) {
      fetchLocationAndReservations();
    }
  }, [id]);

  useEffect(() => {
    const fetchHours = async () => {
      const response = await axios.get("/hours");
      setHours(response.data);
    };
    fetchHours();
  }, []);

  return (
    <>
      <Header />
      {location && (
        <div className="border-2 min-h-screen bg-gray-100 flex items-start justify-center pt-8">
          <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-center text-3xl mb-2">施設詳細</h2>
            <p className="mb-3">◆現在、以下の予約が入っています。</p>
            <Calendar />
            <div className="flex space-x-2">
              <img
                src={location.image_url}
                alt={location.location_name}
                className="mx-auto w-1/2 max-w-xl h-auto rounded-md shadow-md"
              />
              <div className="w-full">
                <table className="border-collapse border border-gray-300 w-full h-20">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 bg-violet-200">
                        施設名
                      </th>
                      <th className="border border-gray-300 px-4 py-2 bg-violet-200">
                        施設ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        {location.location_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {location.id}
                      </td>
                    </tr>
                  </tbody>
                  <tr>
                    <th
                      className="border border-gray-300 px-4 py-2 bg-violet-200 "
                      colspan="2"
                    >
                      施設情報
                    </th>
                  </tr>
                  <tr>
                    <td
                      className="border border-gray-300 px-4 py-2 text-center"
                      colspan="2"
                    >
                      {location.location_info}
                    </td>
                  </tr>
                </table>
                <Link href={`/CreateNote/${location.id}`}>
                  <button
                    className="px-6 py-2 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-300 transition duration-200 ease-in-out shadow-md w-full mt-4"
                  >
                    この施設にコメントする
                  </button>
                </Link>
              </div>
            </div>
            <Link href={`/ReservationCreate/${location.id}`}>
              <button class="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded text-center">
                この施設を予約する
              </button>
            </Link>
            <CommentView location_id={id} />
            <div className="p-1 ">
              <Head>
                <title>時間割</title>
              </Head>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationConfirm;
