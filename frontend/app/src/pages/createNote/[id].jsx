import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { auth } from "@/utils/firebase";

function CreateNote() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState(null);
  const router = useRouter();
  const { id: location_id } = router.query;

  useEffect(() => {
    if (location_id) {
      fetchLocation();
    }
  }, [location_id]);

  const onSubmit = async (data) => {
    try {
      const fd = new FormData();
      fd.append("note[title]", data.title);
      fd.append("note[content]", data.content);
      fd.append("note[user_id]", auth.currentUser.uid);
      fd.append("note[location_id]", location_id);

      const response = await axios.post("/notes", fd);

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setTimeout(() => router.push(`/location/confirm/${location_id}`), 2000);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setShowModal(true);
    }
  };

  const fetchLocation = async () => {
    try {
      const response = await axios.get(`/locations/${location_id}`);
      setLocation(response.data);
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          {location && (
            <div>
              <h3 className="text-center text-3xl mb-2">
                {location.location_name}
              </h3>
              <p className="border-b my-3"> ◆施設に対してのコメントを入力できます。</p>
              <img
                className="my-3 shadow-lg rounded-lg"
                src={location.image_url}
                alt={location.location_name}
              />
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                {...register("title", { required: true })}
                placeholder="タイトルを入力"
                className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 w-full"
              />
              {errors.title && (
                <span className="text-red-500">タイトルは必須項目です</span>
              )}
            </div>
            <div className="mb-4">
              <textarea
                {...register("content", { required: true })}
                placeholder="コメントを入力"
                className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 w-full"
              />
              {errors.content && (
                <span className="text-red-500">内容は必須項目です</span>
              )}
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded w-full"
              >
                送信
              </button>
            </div>
          </form>
          {showModal && (
            <div className="text-center text-red-500">
              エラーが発生しました。再度試してみてください。
            </div>
          )}
          {submitted && (
            <Modal open={showModal} onClose={() => setShowModal(false)} />
          )}
        </div>
      </div>
    </>
  );
}

export default CreateNote;
