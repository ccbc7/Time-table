import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/utils/firebase";
import React from "react";
import ReservationDetail from "@/components/ReservationDetail";

function toDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

const AllCalendar = () => {
  const today = new Date();
  const todayString = toDateString(today);
  const [reservationsMap, setReservationsMap] = useState({});
  const [dayOffset, setDayOffset] = useState(0);
  const [reservations, setReservations] = useState([]);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();
  const selectedDate = watch("date");
  const selectedPeriod = watch("period");
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await axios.get("/reservations");
      const reservationsWithLocationNames = response.data.map((reservation) => {
        reservation.location_name = reservation.location.location_name;
        reservation.location_image = reservation.location.image;
        return reservation;
      });
      setReservations(reservationsWithLocationNames);
    };
    fetchReservations();
  }, []);

  const [hours, setHours] = useState([]);

  useEffect(() => {
    const fetchHours = async () => {
      const response = await axios.get("/hours");
      setHours(response.data);
    };
    fetchHours();
  }, []);

  const location_ids = [...new Set(reservations.map((r) => r.location_id))];
  const location_names = [...new Set(reservations.map((r) => r.location_name))];
  const [day, setDay] = useState(today);

  useEffect(() => {
    const fetchData = async () => {
      const reservationsMap = {};
      for (const reservation of reservations) {
        const date = toDateString(new Date(reservation.date));
        const hour = reservation.period;
        const location = reservation.location_id;
        const key = `${date}-${hour}-${location}`;

        if (reservationsMap[key]) {
          reservationsMap[key].push(reservation);
        } else {
          reservationsMap[key] = [reservation];
        }
      }
      setReservationsMap(reservationsMap);
    };
    fetchData();
  }, [reservations]);

  useEffect(() => {
    const newDay = new Date();
    newDay.setDate(newDay.getDate() + dayOffset);
    setDay(newDay);
  }, [dayOffset]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex items-start justify-center py-3">
        <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-5xl">
          <h2 className="text-center text-3xl mb-2">本日の予定</h2>
          <div className="flex justify-center mb-5">
            <input
              {...register("date", { required: "日付を入力してください" })}
              onChange={(e) => {
                setDay(new Date(e.target.value));
              }}
              type="date"
              min={toDateString(new Date())}
              defaultValue={todayString}
              className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>
          <div className="flex justify-center">
            <table className="table-fixed bg-white rounded-md">
              <thead>
                <tr className="bg-lime-50 border">
                  <th className="p-2 w-20"></th>
                  {location_names.map((location_name, index) => (
                    <th
                      key={index}
                      className="p-2 border w-20"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "upright",
                      }}
                    >
                      {location_name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="border">
                {hours
                  .filter((hour) => hour.period)
                  .map((hour, index) => (
                    <tr key={index}>
                      <td className="p-2 border w-20">{hour.period}</td>
                      {location_ids.map((location_id, index) => {
                        const currentReservations =
                          reservationsMap[
                            `${toDateString(day)}-${hour.period}-${location_id}`
                          ];
                        return (
                          <td
                            key={index}
                            className={`p-2 border ${
                              toDateString(day) === selectedDate &&
                              hour === selectedPeriod
                                ? "bg-green-100"
                                : currentReservations &&
                                  currentReservations.some(
                                    (reservation) =>
                                      reservation.user_id === currentUserId
                                  )
                                ? "bg-green-200"
                                : toDateString(day) === todayString
                                ? "bg-cyan-50"
                                : ""
                            }`}
                          >
                            {currentReservations?.map((reservation, index) => (
                              <React.Fragment key={index}>
                                <ReservationDetail
                                  reservation={reservation}
                                  onClose={() => setIsPopupOpen(false)}
                                />
                                {index < currentReservations.length - 1 && ", "}
                              </React.Fragment>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center my-3">
            <div className=" bg-green-200 border h-6 w-10"></div>
            <p>はあなたの予約した場所です。</p>
          </div>
          <div className="flex justify-center mb-5 mt-3 border-b pb-3">
            <button
              onClick={() => setDayOffset(dayOffset - 1)}
              className="px-6 py-2 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-300 transition duration-200 ease-in-out shadow-md mx-4"
            >
              前の日
            </button>
            <h3 className="text-2xl">{`${day.getFullYear()}年${
              day.getMonth() + 1
            }月${day.getDate()}日`}</h3>
            <button
              onClick={() => setDayOffset(dayOffset + 1)}
              className="px-6 py-2 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-300 transition duration-200 ease-in-out shadow-md mx-4"
            >
              次の日
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCalendar;
