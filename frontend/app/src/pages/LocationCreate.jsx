import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { auth } from "../utils/firebase";
import Modal from "@/components/Modal";

const LocationCreate = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [location_name, setTitle] = useState("");
  const [location_info, setLocationInfo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const submitForm = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("サインインしてください。");
      return;
    }

    const fd = new FormData();
    fd.append("location[location_name]", location_name);
    fd.append("location[user_id]", auth.currentUser.uid);
    fd.append("location[location_info]", location_info);
    if (selectedFile) {
      fd.append("location[image]", selectedFile, selectedFile.name);
    }

    await axios.post("/locations", fd);
    setTitle("");
    setLocationInfo("");
    setSubmitted(true);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      router.push("/LocationShow");
    }, 1000);
  };

  return (
    <>
      <Header />
      {submitted && (
        <Modal open={showModal} onClose={() => setShowModal(false)} />
      )}
      <div className="border-2 min-h-screen bg-gray-100 flex items-start justify-center py-20">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-3xl mb-2">施設登録</h2>
          <form className="mt-8 space-y-6" onSubmit={submitForm}>
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
                className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 w-60"
                placeholder="(例）会議室"
                value={location_name}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex items-start mb-2">
              <label className="pr-3 text-right w-24">施設情報:</label>
              <textarea
                className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 h-40 w-60"
                placeholder="(例)１階南側奥です。"
                value={location_info}
                onChange={(e) => setLocationInfo(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center my-8">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                送信
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LocationCreate;
