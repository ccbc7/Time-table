  import axios from "axios";
  import { useState, useEffect } from "react";
  import { useRouter } from "next/router";
  import { useForm } from "react-hook-form";
  import Header from "@/components/Header";
  import Modal from "@/components/Modal";
  import { auth } from "@/utils/firebase";

  const LocationEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const { register, handleSubmit, errors, setValue } = useForm();
    const [location, setLocation] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchLocation = async () => {
      const response = await axios.get(`/locations/${id}`);
      setLocation(response.data);
      setValue("location_name", response.data.location_name);
      setValue("location_info", response.data.location_info);
    };

    useEffect(() => {
      if (id) {
        fetchLocation();
      }
    }, [id, setValue]);

    const fileSelectedHandler = (event) => {
      setSelectedFile(event.target.files[0]);
    };

    const onSubmit = async (data) => {
      if (!auth.currentUser) {
        alert("サインインしてください。");
        return;
      }

      const fd = new FormData();
      fd.append("location[location_name]", data.location_name);
      fd.append("location[location_info]", data.location_info);
      fd.append("location[user_id]", auth.currentUser.uid);

      if (selectedFile) {
        fd.append("location[image]", selectedFile, selectedFile.name);
      }

      await axios.patch(`/locations/${id}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push(`/locationAll`);
      }, 1000);
    };

    return (
      <>
        <Header />
        {showModal && (
          <Modal open={showModal} onClose={() => setShowModal(false)} />
        )}
        <div className="border-2 bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md ">
            <h2 className="text-center text-3xl mb-2">施設情報編集</h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {location && (
                <img
                  className="my-3 shadow-lg rounded-lg"
                  src={location.image_url}
                  alt={location.location_name}
                />
              )}
              <div className="mb-2">
                <input
                  id="file-upload"
                  type="file"
                  onChange={fileSelectedHandler}
                  className="flex justify-center items-center"
                  placeholder="ファイルをアップロード"
                />
              </div>
              <div className="mb-2">
                <label className="pr-3 text-right w-24 inline-block">
                  施設名:
                </label>
                <input
                  {...register("location_name", {
                    required: "施設名を入力してください",
                  })}
                  className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 w-60"
                  placeholder="施設名"
                />
              </div>
              <div className="flex items-start mb-2">
                <label className="pr-3 text-right w-24">施設情報:</label>
                <textarea
                  {...register("location_info", {
                    required: "施設情報を入力してください",
                  })}
                  className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 w-60"
                  placeholder="施設情報"
                />
              </div>
              <div className="flex justify-center items-center my-8">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  更新
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

export default LocationEdit;
