import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import Link from "next/link";

const HourForm = ({ hour, onUpdate, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: hour,
  });

  const onSubmit = async (data) => {
    try {
      const { period } = data;
      const updatedHour = await axios.put(`/hours/${hour.id}`, { period });
      onUpdate(updatedHour);
      onSave(hour.id, data);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push(`/hours`);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          description={"時間設定を変更しました。"}
        />
      )}
      <div className="my-2 border-b">
        <form
          key={hour.id}
          onSubmit={handleSubmit(onSubmit)}
          className=" flex items-center justify-between py-2 px-4"
        >
          <div className="flex">
            <label
              htmlFor={`period-${hour.id}`}
              className="text-gray-700 font-bold"
            >
              時間：
            </label>
            <div>
              <p>{hour.id}</p>
            </div>
          </div>
          <div>
            <input
              id={`period-${hour.id}`}
              className="shadow border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("period", {})}
            />
            {errors.period && (
              <p className="text-red-500 text-xs italic">
                {errors.period.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-2 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-lime-100 transition duration-200 ease-in-out shadow-md"
          >
            更新
          </button>
        </form>
      </div>
    </>
  );
};

const HoursPage = () => {
  const [hours, setHours] = useState([]);
  const [hourUpdates, setHourUpdates] = useState({});
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchHours = async () => {
      const response = await axios.get("/hours");
      setHours(response.data);
    };
    fetchHours();
  }, []);

  const handleUpdate = (updatedHour) => {
    setHours(hours.map((h) => (h.id === updatedHour.id ? updatedHour : h)));
  };

  const handleSave = (id, updatedHour) => {
    setHourUpdates((prevHourUpdates) => ({
      ...prevHourUpdates,
      [id]: updatedHour,
    }));
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 flex justify-center items-center py-3 min-h-screen">
        <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-3">
              時間設定変更
            </h2>
            <p className="border-b mb-3">
              ◆時間割に使用する各時間割名を変更できます。
            </p>
            {hours.map((hour) => (
              <HourForm
                key={hour.id}
                hour={hour}
                onUpdate={handleUpdate}
                onSave={handleSave}
                setShowModal={setShowModal}
              />
            ))}
          </div>
          <div className="flex justify-center items-center ">
            <Link
              href="/"
              className="px-4 py-2 cursor-pointer text-black hover:text-blue-500"
            >
              Topに戻る
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HoursPage;
