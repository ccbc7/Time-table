// import Head from "next/head";
// import Header from "@/components/Header";
// import { useState, useEffect } from "react";

// export default function Timetable() {
//   const [weekOffset, setWeekOffset] = useState(0);
//   const hours = [
//     "1時間目",
//     "2時間目",
//     "3時間目",
//     "4時間目",
//     "昼休み",
//     "5時間目",
//     "6時間目",
//     "放課後",
//   ];

//   const [days, setDays] = useState([]);

//   useEffect(() => {
//     const today = new Date();
//     today.setDate(today.getDate() + weekOffset * 7);
//     const firstDayOfWeek =
//       today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);

//     const newDays = [
//       { date: new Date(today.setDate(firstDayOfWeek)), name: "月曜日" },
//       { date: new Date(today.setDate(firstDayOfWeek + 1)), name: "火曜日" },
//       { date: new Date(today.setDate(firstDayOfWeek + 2)), name: "木曜日" },
//       { date: new Date(today.setDate(firstDayOfWeek + 3)), name: "金曜日" },
//       { date: new Date(today.setDate(firstDayOfWeek + 4)), name: "土曜日" },
//       { date: new Date(today.setDate(firstDayOfWeek + 5)), name: "日曜日" },
//     ];
//     setDays(newDays);
//   }, [weekOffset]);

//   return (
//     <>
//       <Header />
//       <div>
//         <Head>
//           <title>時間割</title>
//         </Head>

//         <main>
//           <h1>時間割</h1>
//           {days.length > 0 && (
//             <h3>{`${days[0].date.getFullYear()}年${
//               days[0].date.getMonth() + 1
//             }月`}</h3>
//           )}
//           <button onClick={() => setWeekOffset(weekOffset - 1)}>前の週</button>
//           <button onClick={() => setWeekOffset(weekOffset + 1)}>次の週</button>
//           <table>
//             <thead>
//               <tr>
//                 <th>時限</th>
//                 {days.map((day, index) => (
//                   <th key={index}>
//                     {day.name} ({day.date.getMonth() + 1}/{day.date.getDate()})
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {hours.map((hour, index) => (
//                 <tr key={index}>
//                   <td>{hour}</td>
//                   {days.map((day, index) => (
//                     <td key={index}>---</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </main>
//       </div>
//     </>
//   );
// }

import Head from "next/head";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

export default function Timetable() {
  const [weekOffset, setWeekOffset] = useState(0);
  const hours = [
    "1時間目",
    "2時間目",
    "3時間目",
    "4時間目",
    "昼休み",
    "5時間目",
    "6時間目",
    "放課後",
  ];

  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + weekOffset * 7);
    const firstDayOfWeek =
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);

    const newDays = [
      { date: new Date(today.setDate(firstDayOfWeek)), name: "月曜日" },
      { date: new Date(today.setDate(firstDayOfWeek + 1)), name: "火曜日" },
      { date: new Date(today.setDate(firstDayOfWeek + 2)), name: "木曜日" },
      { date: new Date(today.setDate(firstDayOfWeek + 3)), name: "金曜日" },
      { date: new Date(today.setDate(firstDayOfWeek + 4)), name: "土曜日" },
      { date: new Date(today.setDate(firstDayOfWeek + 5)), name: "日曜日" },
    ];
    setDays(newDays);
  }, [weekOffset]);

  const highlightClass = selectedDate && selectedHour ? "bg-green-200" : "";

  return (
    <>
      <Header />
      <div className="p-10 bg-gray-100 min-h-screen">
        <Head>
          <title>時間割</title>
        </Head>

        <main>
          <h1 className="text-4xl mb-10">時間割</h1>
          {days.length > 0 && (
            <h3 className="text-xl mb-5">{`${days[0].date.getFullYear()}年${
              days[0].date.getMonth() + 1
            }月`}</h3>
          )}
          <div className="mb-5">
            <label className="block mb-2">
              日付:
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border-2 rounded-md"
              >
                <option value="">選択してください</option>
                {days.map((day, index) => (
                  <option
                    key={index}
                    value={day.date.toISOString().split("T")[0]}
                  >
                    {day.name} ({day.date.getMonth() + 1}/{day.date.getDate()})
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-2">
              時限:
              <select
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
                className="w-full p-2 border-2 rounded-md"
              >
                <option value="">選択してください</option>
                {hours.map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-5">
            <button
              onClick={() => setWeekOffset(weekOffset - 1)}
              className="mr-2 px-5 py-2 bg-blue-500 text-white rounded-md"
            >
              前の週
            </button>
            <button
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="px-5 py-2 bg-blue-500 text-white rounded-md"
            >
              次の週
            </button>
          </div>
          <table className="w-full bg-white rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">時限</th>
                {days.map((day, index) => (
                  <th key={index} className="p-2">  
                    {day.name} ({day.date.getMonth() + 1}/{day.date.getDate()})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, index) => (
                <tr key={index}>
                  <td className="p-2">{hour}</td>
                  {days.map((day, index) => (
                    <td
                      key={index}
                      className={`p-2 ${
                        day.date.toISOString().split("T")[0] === selectedDate &&
                        hour === selectedHour
                          ? highlightClass
                          : ""
                      }`}
                    >
                      ---
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}

// import Head from "next/head";
// import Header from "@/components/Header";
// import { useState, useEffect } from "react";

// export default function Timetable() {
//   const [weekOffset, setWeekOffset] = useState(0);
//   const hours = [
//     "1時間目",
//     "2時間目",
//     "3時間目",
//     "4時間目",
//     "昼休み",
//     "5時間目",
//     "6時間目",
//     "放課後",
//   ];

//   const [days, setDays] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedHour, setSelectedHour] = useState("");

//   useEffect(() => {
//     const today = new Date();
//     today.setDate(today.getDate() + weekOffset * 7);
//     const firstDayOfWeek =
//       today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);

//     const newDays = [
//       { date: new Date(today.setDate(firstDayOfWeek)), name: "月曜日" },
//       { date: new Date(today.setDate(firstDayOfWeek + 1)), name: "火曜日" },
//       { date: new Date(today.setDate(firstDayOfWeek + 2)), name: "木曜日" },
//       { date: new Date(today.setDate(firstDayOfWeek + 3)), name: "金曜日" },
//       { date: new Date(today.setDate(firstDayOfWeek + 4)), name: "土曜日" },
//       { date: new Date(today.setDate(firstDayOfWeek + 5)), name: "日曜日" },
//     ];
//     setDays(newDays);
//   }, [weekOffset]);

//   const highlightClass = selectedDate && selectedHour ? "bg-green-200" : "";

//   return (
//     <>
//       <Header />
//       <div>
//         <Head>
//           <title>時間割</title>
//         </Head>

//         <main>
//           <h1>時間割</h1>
//           {days.length > 0 && (
//             <h3>{`${days[0].date.getFullYear()}年${
//               days[0].date.getMonth() + 1
//             }月`}</h3>
//           )}
//           <div>
//             <label>
//               日付:
//               <select
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//               >
//                 <option value="">選択してください</option>
//                 {days.map((day, index) => (
//                   <option
//                     key={index}
//                     value={day.date.toISOString().split("T")[0]}
//                   >
//                     {day.name} ({day.date.getMonth() + 1}/{day.date.getDate()})
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <label>
//               時限:
//               <select
//                 value={selectedHour}
//                 onChange={(e) => setSelectedHour(e.target.value)}
//               >
//                 <option value="">選択してください</option>
//                 {hours.map((hour, index) => (
//                   <option key={index} value={hour}>
//                     {hour}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>

//           <button onClick={() => setWeekOffset(weekOffset - 1)}>前の週</button>
//           <button onClick={() => setWeekOffset(weekOffset + 1)}>次の週</button>
//           <table>
//             <thead>
//               <tr>
//                 <th>時限</th>
//                 {days.map((day, index) => (
//                   <th key={index}>
//                     {day.name} ({day.date.getMonth() + 1}/{day.date.getDate()})
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {hours.map((hour, index) => ( //
//                 <tr key={index}>
//                   <td>{hour}</td>
//                   {days.map((day, index) => (
//                     <td
//                       key={index}
//                       className={
//                         day.date.toISOString().split("T")[0] === selectedDate &&
//                         hour === selectedHour
//                           ? highlightClass
//                           : ""
//                       }
//                     >
//                       ---
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </main>
//       </div>
//     </>
//   );
// }
