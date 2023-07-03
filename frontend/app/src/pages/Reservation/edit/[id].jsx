import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import { auth } from "@/utils/firebase";

const ReservationEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, errors, setValue } = useForm();
  const [reservation, setReservation] = useState(null);
  const [location, setLocation] = useState(null);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const fetchReservation = async () => {
      const response = await axios.get(`/reservations/${id}`);
      setReservation(response.data);
      setLocation(response.data.location);
      setValue("period", response.data.period);
      setValue("date", response.data.date.split("T")[0]);
    };
  if (id) {
    fetchReservation();
    }
  }, [id, setValue]);

  useEffect(() => {
    const fetchHours = async () => {
      const response = await axios.get("/hours");
      setHours(response.data);
    };
    fetchHours();
  }, []);

  const onSubmit = async (data) => {
    if (!auth.currentUser) {
      alert("サインインしてください。");
      return;
    }

    const fd = new FormData();
    fd.append("reservation[period]", data.period);
    fd.append("reservation[date]", data.date);
    fd.append("reservation[location_id]", reservation.location.id);
    fd.append("reservation[user_id]", auth.currentUser.uid);

    try {
      await axios.patch(`/reservations/${id}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push(`/ReservationAll`);
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

  if (!location) return null;
  return (
    <>
      <Header />
      <div className="border-2 min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md -mt-32">
          <h2 className="text-center text-3xl mb-2">
            予約編集: {location.location_name}
          </h2>
          <img src={location.image_url} alt={location.location_name} />
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
              <label className="pr-3 w-24 text-right">日付:</label>
              <input
                {...register("date", { required: "日付を入力してください" })}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            <div className="flex justify-center items-center my-8">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                予約
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReservationEdit;
