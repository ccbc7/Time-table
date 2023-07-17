// import axios from "axios";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { auth } from "../utils/firebase";
// import Header from "@/components/Header";
// import Head from "next/head";
// import Footer from "@/components/Footer";

// const ReservationAll = () => {
//   const [reservations, setReservations] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   useEffect(() => {
//     const fetchReservations = async (userId) => {
//       const response = await axios.get(`/reservations?user_id=${userId}`);
//       setReservations(response.data);
//       console.log(response.data);
//     };

//     const unSub = auth.onAuthStateChanged((user) => {
//       if (user) fetchReservations(user.uid);
//     });

//     return () => unSub();
//   }, []);

//   const deleteReservation = async (id) => {
//     if (window.confirm("本当に削除しますか？")) {
//       const userId = auth.currentUser.uid;
//       await axios.delete(`/reservations/${id}`, { data: { user_id: userId } });
//       setReservations(reservations.filter((reservation) => reservation.id !== id));
//     }
//   };

//   const YourComponent = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const handleDropdownClick = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <>
//       <Head>
//         <title>予約確認</title>
//       </Head>
//       <Header />
//       <h1 className="text-3xl text-center font-bold">予約確認</h1>
//       <p className="text-center border-b my-3">
//         ◆あなたの予約した内容が確認できます。
//       </p>
//       <div className="my-4 flex flex-col items-center sm:grid sm:grid-cols-4 sm:gap-2 mx-2">
//         {reservations.map((reservation) => (
//           <div
//             key={reservation.id}
//             className="w-full sm:w-auto mb-4 sm:mb-0 border rounded-sm shadow-lg p-4"
//           >
//             <div onClick={handleDropdownClick} className="cursor-pointer">
//               {reservation.location?.location_name}
//               <div className="mb-2">予約日: {reservation.date}</div>
//               <div className="mb-2">予約時限: {reservation.period}</div>
//             </div>
//             {isDropdownOpen && (
//               <div className="mt-4">
//                 <div className="mb-2">予約者: {reservation.user?.username}</div>
//                 <div className="mb-2">使用者: {reservation.facility_user_name}</div>
//                 <div className="mb-2">用途: {reservation.purpose}</div>
//                 <div className="mb-2">
//                   予約作成日時:{" "}
//                   {new Intl.DateTimeFormat("ja-JP", {
//                     dateStyle: "short",
//                     timeStyle: "medium",
//                   }).format(new Date(reservation.created_at))}
//                 </div>
//                 <div className="sm:border py-1 px-6 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-100 transition duration-200 ease-in-out shadow-sm my-2 text-center">
//                   <button onClick={() => deleteReservation(reservation.id)}>
//                     削除
//                   </button>
//                 </div>
//                 <div className="sm:border py-1 px-6 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-100 transition duration-200 ease-in-out shadow-sm my-2 text-center">
//                   <Link href={`reservation/edit/${reservation.id}`}>
//                     編集
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="text-center">
//         <Link href="/locationAll">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded text-center">
//             施設を予約する
//           </button>
//         </Link>
//       </div>
//       <Footer />
//     </>
//     // <>
//     //   <Head>
//     //     <title>予約確認</title>
//     //   </Head>
//     //   <Header />
//     //   <h1 className="text-3xl text-center font-bold">予約確認</h1>
//     //   <p className="text-center border-b my-3">
//     //     ◆あなたの予約した内容が確認できます。
//     //   </p>
//     //   <div className="my-4 flex flex-col items-center sm:grid sm:grid-cols-4 sm:gap-2 mx-2">
//     //     {reservations.map((reservation) => (
//     //       <div
//     //         key={reservation.id}
//     //         className="w-full sm:w-auto mb-4 sm:mb-0 border rounded-sm shadow-lg p-4"
//     //       >
//     //         <div className="mb-4">
//     //           <Link href={`location/confirm/${reservation.location?.id}`}>
//     //             <img
//     //               src={reservation.location?.image_url}
//     //               alt={reservation.title}
//     //               className="h-32 w-auto mx-auto object-cover"
//     //             />
//     //           </Link>
//     //         </div>
//     //         <div className="mb-2 font-bold text-center">
//     //           {reservation.location?.location_name}
//     //         </div>
//     //         <div className="mb-2">ID: {reservation.id}</div>
//     //         <div className="mb-2">予約者: {reservation.user?.username}</div>
//     //         <div className="mb-2">使用者: {reservation.facility_user_name}</div>
//     //         <div className="mb-2">用途: {reservation.purpose}</div>
//     //         <div className="mb-2">予約日: {reservation.date}</div>
//     //         <div className="mb-2">予約時限: {reservation.period}</div>
//     //         <div className="mb-2">
//     //           予約作成日時:{" "}
//     //           {new Intl.DateTimeFormat("ja-JP", {
//     //             dateStyle: "short",
//     //             timeStyle: "medium",
//     //           }).format(new Date(reservation.created_at))}
//     //         </div>
//     //         <div className="sm:border py-1 px-6 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-100 transition duration-200 ease-in-out shadow-sm my-2 text-center">
//     //           <button onClick={() => deleteReservation(reservation.id)}>
//     //             削除
//     //           </button>
//     //         </div>
//     //         <div className="sm:border py-1 px-6 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-100 transition duration-200 ease-in-out shadow-sm my-2 text-center">
//     //           <Link href={`reservation/edit/${reservation.id}`}>編集</Link>
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>
//     //   <div className="text-center">
//     //     <Link href="/locationAll">
//     //       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded text-center">
//     //         施設を予約する
//     //       </button>
//     //     </Link>
//     //   </div>
//     //   <Footer />
//     // </>
//   );
// };

// export default ReservationAll;






import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import Header from "@/components/Header";
import Head from "next/head";
import Footer from "@/components/Footer";

const ReservationAll = () => {
  const [reservations, setReservations] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
      <div className="my-4 flex flex-col items-center sm:grid sm:grid-cols-4 sm:gap-2 mx-2">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="w-full sm:w-auto mb-4 sm:mb-0 border rounded-sm shadow-lg p-4"
          >
            <div onClick={handleDropdownClick} className="cursor-pointer flex">
              <div>
                <Link href={`location/confirm/${reservation.location?.id}`}>
                  <img
                    src={reservation.location?.image_url}
                    alt={reservation.title}
                    className="h-20 w-auto mx-auto object-cover"
                  />
                </Link>
              </div>
              <div>
                {reservation.location?.location_name}
                <div className="">予約日: {reservation.date}</div>
                <div className="">予約時限: {reservation.period}</div>
              </div>
            </div>
            {isDropdownOpen && (
              <div className="mt-4">
                <div className="mb-2">予約者: {reservation.user?.username}</div>
                <div className="mb-2">
                  使用者: {reservation.facility_user_name}
                </div>
                <div className="mb-2">用途: {reservation.purpose}</div>
                <div className="mb-2">
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
