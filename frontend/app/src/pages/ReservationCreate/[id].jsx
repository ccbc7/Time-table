import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import { auth } from "@/utils/firebase";
import Modal from "@/components/Modal";

function toDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

const ReservationCreate = () => {
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
  const selectedDate = watch("date");
  const selectedPeriod = watch("period");
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hours, setHours] = useState([]);


  useEffect(() => {
    const fetchReservations = async () => {
      const response = await axios.get("/reservations");
      setReservations(response.data);
    };
    fetchReservations();
  }, []);

  useEffect(() => {
    const fetchHours = async () => {
      const response = await axios.get("/hours");
      setHours(response.data);
    };
    fetchHours();
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
    const fetchReservations = async () => {
      const response = await axios.get("/reservations");
      setReservations(response.data);
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await axios.get(`/locations/${id}`);
      setLocation(response.data);
    };

    if (id) {
      fetchLocation();
    }
  }, [id]);

  const createBooking = async (data, date) => {
    const fd = new FormData();
    fd.append("reservation[period]", data.period);
    fd.append("reservation[date]", date.toISOString().split("T")[0]);
    fd.append("reservation[facility_user_name]", data.facility_user_name);
    fd.append("reservation[location_id]", id);
    fd.append("reservation[purpose]", data.purpose);
    fd.append("reservation[user_id]", auth.currentUser.uid);

    try {
      await axios.post("/reservations", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      if (err.response) {
        console.log("Error response data: ", err.response.data);
      } else if (err.request) {
        console.log("Error request: ", err.request);
      } else {
        console.log("Error: ", err.message);
      }
    }
  };

  const onSubmit = async (data) => {
    if (!auth.currentUser) {
      alert("サインインしてください。");
      return;
    }

    if (data.weeklyBooking) {
      let date = new Date(data.date);
      const endDate = new Date(date.getFullYear() + 1, 2, 31);
      while (date <= endDate) {
        await createBooking(data, date);
        date.setDate(date.getDate() + 7);
      }
    } else {
      await createBooking(data, new Date(data.date));
    }

    setSubmitted(true);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      router.push(`/ReservationIndex`);
    }, 1000);
  };

  if (!location) return null;

  return (
    <>
      <Header />
      {submitted && (
        <Modal open={showModal} onClose={() => setShowModal(false)} />
      )}
      <div className="border-2 min-h-screen bg-gray-100 flex items-start justify-center py-3">
        <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-center text-3xl mb-2">
            予約作成: {location.location_name}
          </h2>
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
                            reservationExists
                              ? "bg-red-50"
                              : toDateString(day.date) === selectedDate &&
                                hour.period === selectedPeriod
                              ? "bg-green-200"
                              : toDateString(day.date) === todayString
                              ? "bg-cyan-50"
                              : ""
                          }`}
                        >
                          {reservationExists
                            ? reservation.facility_user_name
                            : "---"}
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
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center mb-2">
              <label className="pr-3 w-24 text-right">日付:</label>
              <input
                {...register("date", { required: "日付を入力してください" })}
                type="date"
                min={toDateString(new Date())}
                className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            <div className="flex justify-center items-center mb-2">
              <label className="pr-3 text-right">毎週予約する(3/31まで):</label>
              <input {...register("weeklyBooking")} type="checkbox" />
            </div>
            <div className="flex justify-center items-center mb-2">
              <label className="pr-3 w-24 text-right">時限:</label>
              <select
                {...register("period", { required: "時限を選択してください" })}
                className="px-3 py-2 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              >
                <option value="">選択してください</option>
                {hours
                  .filter((hour) => hour.period)
                  .map((hour, index) => (
                    <option key={index} value={hour.period}>
                      {hour.period}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-center items-center mb-2">
              <label className="pr-3 w-24 text-right">使用者:</label>
              <input
                {...register("facility_user_name", {
                  required: "使用者を入力してください",
                })}
                type="text"
                name="facility_user_name"
                className="w-60 px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                placeholder="(例)3年2組"
              />
            </div>
            {errors.facility_user_name && (
              <p className="text-red-500 text-center">
                {errors.facility_user_name.message}
              </p>
            )}
            <div className="flex justify-center items-center mb-2">
              <label className="pr-3 w-24 text-right">用途:</label>
              <input
                {...register("purpose", { required: "用途を入力してください" })}
                type="text"
                name="purpose"
                placeholder="(例)会議"
                className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            {errors.purpose && (
              <p className="text-red-500 text-center">
                {errors.purpose.message}
              </p>
            )}
            <div className="flex justify-center items-center my-8">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded w-full"
              >
                予約する
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReservationCreate;
