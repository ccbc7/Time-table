// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import Header from "@/components/Header";
// import Timetable from "@/pages/Timetable";

// const LocationConfirm = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [location, setLocation] = useState(null);
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     const fetchLocationAndReservations = async () => {
//       const locationResponse = await axios.get(`/locations/${id}`);
//       setLocation(locationResponse.data);

//       const reservationsResponse = await axios.get(
//         `/reservations?location_id=${id}` //
//       );
//       setReservations(reservationsResponse.data);
//     };

//     if (id) {
//       fetchLocationAndReservations();
//     }
//   }, [id]);

//   return (
//     <>
//       <Header />
//       {location && (
//         <div className="border-2 min-h-screen bg-gray-100 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-center text-3xl mb-2">施設詳細</h2>
//             <img
//               src={location.image_url}
//               alt={location.location_name}
//               className="mx-auto w-full max-w-md h-auto rounded-md shadow-md"
//             />
//             <table className="mt-8 border-collapse border border-gray-300 w-full">
//               <thead>
//                 <tr>
//                   <th className="border border-gray-300 px-4 py-2 bg-violet-200">
//                     施設名
//                   </th>
//                   <th className="border border-gray-300 px-4 py-2 bg-violet-200">
//                     施設ID
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="text-center">
//                 <tr>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {location.location_name}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {location.id}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <h3 className="text-center text-2xl mt-8 mb-4">予約一覧</h3>
//             <p className="text-center">現在、以下の予約が入っています。</p>
//             <table className="mt-4 border-collapse border border-gray-300 w-full">
//               <thead>
//                 <tr>
//                   <th className="border border-gray-300 px-4 py-2 bg-violet-200">
//                     予約時間
//                   </th>
//                   <th className="border border-gray-300 px-4 py-2 bg-violet-200">
//                     予約日
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="text-center">
//                 {reservations.map((reservation, index) => (
//                   <tr key={index}>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {reservation.period}
//                       {reservation.location_id}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {new Date(reservation.date).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default LocationConfirm;


import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Timetable from "@/pages/Timetable";

const LocationConfirm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [location, setLocation] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchLocationAndReservations = async () => {
      const locationResponse = await axios.get(`/locations/${id}`);
      setLocation(locationResponse.data);

      const reservationsResponse = await axios.get(
        `/reservations?location_id=${id}` //
      );
      setReservations(reservationsResponse.data);
    };

    if (id) {
      fetchLocationAndReservations();
    }
  }, [id]);

  return (
    <>
      <Header />
      {location && (
        <div className="border-2 min-h-screen bg-gray-100 flex items-start justify-center pt-8">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-center text-3xl mb-2">施設詳細</h2>
            <img
              src={location.image_url}
              alt={location.location_name}
              className="mx-auto w-full max-w-xl h-auto rounded-md shadow-md"
            />
            <table className="mt-8 border-collapse border border-gray-300 w-full">
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
            </table>
            <h3 className="text-center text-2xl mt-8 mb-4 border-t-2">予約一覧</h3>
            <p>現在、以下の予約が入っています。</p>
            <table className="mt-4 border-collapse border border-gray-300 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 bg-violet-200">
                    予約日
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-violet-200">
                    予約時間
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-violet-200">
                    予約者
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {reservations.map((reservation, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(reservation.date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {reservation.period}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {reservation.user?.username}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Timetable />
          </div>
        </div>
      )}
    </>
  );
};

export default LocationConfirm;















// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import Header from "@/components/Header";
// import Timetable from "@/pages/Timetable";

// const LocationConfirm = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [location, setLocation] = useState(null);
//   const [reservations, setReservations] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedHour, setSelectedHour] = useState("");

//   useEffect(() => {
//     const fetchLocationAndReservations = async () => {
//       const locationResponse = await axios.get(`/locations/${id}`);
//       setLocation(locationResponse.data);

//       const reservationsResponse = await axios.get(
//         `/reservations?location_id=${id}` //
//       );
//       setReservations(reservationsResponse.data);
//     };

//     if (id) {
//       fetchLocationAndReservations();
//     }
//   }, [id]);

//   return (
//     <>
//       <Header />
//       {location && (
//         <div className="border-2 min-h-screen bg-gray-100 flex items-center justify-center">
//           <div className="grid md:grid-cols-2 gap-4 w-full max-w-7xl">
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-center text-3xl mb-2">施設詳細</h2>
//               <img
//                 src={location.image_url}
//                 alt={location.location_name}
//                 className="mx-auto w-full max-w-md h-auto rounded-md shadow-md"
//               />
//               <table className="mt-8 border-collapse border border-gray-300 w-full">
//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 px-4 py-2 bg-violet-200">
//                       施設名
//                     </th>
//                     <th className="border border-gray-300 px-4 py-2 bg-violet-200">
//                       施設ID
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-center">
//                   <tr>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {location.location_name}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {location.id}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <h3 className="text-center text-2xl mt-8 mb-4">予約一覧</h3>
//               <p className="text-center">現在、以下の予約が入っています。</p>
//               <table className="mt-4 border-collapse border border-gray-300 w-full">
//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 px-4 py-2 bg-violet-200">
//                       予約時間
//                     </th>
//                     <th className="border border-gray-300 px-4 py-2 bg-violet-200">
//                       予約日
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-center">
//                   {reservations.map((reservation, index) => (
//                     <tr key={index}>
//                       <td className="border border-gray-300 px-4 py-2">
//                         {reservation.period}
//                         {reservation.location_id}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         {new Date(reservation.date).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <Timetable />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default LocationConfirm;
