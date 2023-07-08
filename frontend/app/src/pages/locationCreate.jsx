import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { auth } from "../utils/firebase";
import Modal from "@/components/Modal";
import Head from "next/head";

const LocationCreate = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [validFile, setValidFile] = useState(true);
  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    if (!file.type.startsWith("image/")) {
      setValidFile(false);
      return;
    }
    setSelectedFile(file);
    setValidFile(true);
  };
  const [location_name, setTitle] = useState("");
  const [location_info, setLocationInfo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const submitForm = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("サインインしてください。");
      return;
    }

    if (!location_name) {
      setTitleError("施設名を入力してください");
      return;
    }

    const fd = new FormData();
    fd.append("location[location_name]", location_name);
    fd.append("location[user_id]", auth.currentUser.uid);
    fd.append("location[location_info]", location_info);
    if (selectedFile) {
      fd.append("location[image]", selectedFile, selectedFile.name);
    } else {
      const response = await fetch("/sample_facility.png");
      const blob = await response.blob();
      fd.append("location[image]", blob, "sample_facility.png");
    }

    try {
      await axios.post("/locations", fd);
      setTitle("");
      setLocationInfo("");
      setSubmitted(true);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push("/locationShow");
      }, 1000);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <>
      <Head>
        <title>施設登録</title>
      </Head>
      <Header />
      {submitted && (
        <Modal open={showModal} onClose={() => setShowModal(false)} />
      )}
      <div className="border-2 min-h-screen bg-gray-50 flex items-start justify-center py-20">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-3xl mb-2">施設登録</h2>
          {errorMessage && (
            <p className="text-center text-red-600">{errorMessage}</p>
          )}
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
            {!validFile && (
              <p className="text-center  text-red-600">
                アップロード可能なのは画像ファイルのみです。
              </p>
            )}
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
            {titleError && (
              <p className="text-center text-red-600">{titleError}</p>
            )}
            {""}
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
                disabled={!validFile}
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
