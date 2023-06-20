import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { auth } from "../utils/firebase";

const LocationCreate = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [location_name, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
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
    if (selectedFile) {
      fd.append("location[image]", selectedFile, selectedFile.name);
    }

    await axios.post("/locations", fd);

    setTitle("");
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      router.push("/LocationShow");
    }, 1000);
  };

  return (
    <>
      <Header />
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center">
            <div className="inline-block bg-purple-400 rounded p-5 text-lg text-black">
              送信しました
            </div>
          </div>
        </div>
      )}
      <div className="border-2 min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md -mt-32">
          <h2 className="text-center text-3xl mb-2">施設登録</h2>
          <form className="mt-8 space-y-6" onSubmit={submitForm}>
            <div className="flex justify-center items-center my-8">
                <input
                  id="file-upload"
                  type="file"
                  onChange={fileSelectedHandler}
                  className="flex justify-center items-center"
                  placeholder="ファイルをアップロード"
                />
            </div>
            <div className="text-center">
                <label className="self-center pr-3">施設名:</label>
                <input
                  className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  placeholder="(例）会議室"
                  value={location_name}
                  onChange={(e) => setTitle(e.target.value)}
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

