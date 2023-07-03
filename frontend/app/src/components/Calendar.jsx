import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function toDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

function ReservationCreate() {
  const router = useRouter();
  const { id } = router.query;
  const today = new Date();
  const todayString = toDateString(today);
  const [reservationsMap, setReservationsMap] = useState({});
  const [weekOffset, setWeekOffset] = useState(0);
  const [location, setLocation] = useState(null);
  const [reservations, setReservations] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const selectedDate = watch("date"); // 日付フィールドの値を監視
  const selectedPeriod = watch("period"); // 時限フィールドの値を監視
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await axios.get("/reservations");
      setReservations(response.data);
    };

    fetchReservations();
  }, []);

  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const reservationsResponse = await axios.get(
        `/reservations?location_id=${id}`
      );
      setReservations(reservationsResponse.data);

      const reservationsMap = {};
      for (const reservation of reservationsResponse.data) {
        const date = toDateString(new Date(reservation.date));
        const hour = reservation.period;
        const key = `${date}-${hour}`;
        reservationsMap[key] = reservation;
      }
      setReservationsMap(reservationsMap);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + weekOffset * 7);
    const firstDayOfWeek =
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);

    const newDays = Array(7)
      .fill(0)
      .map((_, i) => {
        const thisDate = new Date(today);
        thisDate.setDate(firstDayOfWeek + i);
        return {
          date: thisDate,
          name: ["日", "月", "火", "水", "木", "金", "土"][thisDate.getDay()],
        };
      });

    setDays(newDays);
  }, [weekOffset]);

  useEffect(() => {
    const fetchHours = async () => {
      const response = await axios.get("/hours");
      setHours(response.data);
    };
    fetchHours();
  }, []);

  return (
    <>
      <table className="table-fixed bg-white rounded-md overflow-hidden w-full">
        <thead>
          <tr className="bg-lime-50 border">
            <th className="p-2 w-20">時限</th>
            {days.map((day, index) => (
              <th key={index} className="p-2 border w-20">
                {day.date.getMonth() + 1}/{day.date.getDate()}
                {day.name}
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
              {days.map((day, dayIndex) => {
                const date = toDateString(day.date);
                const key = `${date}-${hour.period}`;
                const reservation = reservationsMap[key];
                const reservationExists = reservation !== undefined;
                return (
                  <td
                    key={index}
                    className={`p-2 border ${
                      toDateString(day.date) === todayString
                        ? "bg-cyan-50"
                        : reservationExists
                        ? "bg-red-50" 
                        : toDateString(day.date) === selectedDate &&
                          hour === selectedPeriod
                        ? "bg-green-50"
                        : ""
                    }`}
                  >
                    {reservationExists ? reservation.facility_user_name : "---"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mb-5 mt-3 border-b pb-3">
        <button
          onClick={() => setWeekOffset(weekOffset - 1)}
          className="mr-8 px-5 py-2 bg-blue-500 text-white rounded-md"
        >
          前の週
        </button>
        <h3 className="text-xl">{`${today.getFullYear()}年${
          today.getMonth() + 1
        }月${today.getDate()}日`}</h3>
        <button
          onClick={() => setWeekOffset(weekOffset + 1)}
          className="ml-8 px-5 py-2 bg-blue-500 text-white rounded-md"
        >
          次の週
        </button>
      </div>
    </>
  );
}

export default ReservationCreate;
