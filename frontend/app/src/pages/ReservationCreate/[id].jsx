import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import { auth } from "@/utils/firebase";
import Timetable from "../Timetable";

const ReservationCreate = () => {
  const router = useRouter();
  const { id } = router.query; // location idをURLパラメータから取得
  const { register, handleSubmit, errors } = useForm();
  const [location, setLocation] = useState(null);

  // locationを取得
  useEffect(() => {
    const fetchLocation = async () => {
      const response = await axios.get(`/locations/${id}`);
      setLocation(response.data);
    };

    if (id) {
      fetchLocation();
    }
  }, [id]);

  // フォームを送信
  const onSubmit = async (data) => {
    if (!auth.currentUser) {
      alert("サインインしてください。");
      return;
    }

    const fd = new FormData();
    fd.append("reservation[period]", data.period);
    fd.append("reservation[date]", data.date);
    // fd.append("reservation[booked_user_id]", auth.currentUser.uid);
    fd.append("reservation[location_id]", id); //
    fd.append("reservation[user_id]", auth.currentUser.uid);

    // await axios.post("/reservations", fd);
    // router.push(`/reservations`);

    //   await axios.post("/reservations", fd, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   router.push(`/reservations`);
    // };
    try {
      await axios.post("/reservations", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push(`/ReservationIndex`);
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
      {/* <Timetable /> */}
      <div className="border-2 min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md -mt-32">
          <h2 className="text-center text-3xl mb-2">
            予約作成: {location.location_name}
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
                <option value="1時間目">1時間目</option>
                <option value="2時間目">2時間目</option>
                <option value="3時間目">3時間目</option>
                <option value="4時間目">4時間目</option>
                <option value="昼休み">昼休み</option>
                <option value="5時間目">5時間目</option>
                <option value="6時間目">6時間目</option>
                <option value="放課後">放課後</option>
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

export default ReservationCreate;
