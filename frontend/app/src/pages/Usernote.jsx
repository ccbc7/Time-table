import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { auth } from "../utils/firebase";
import UserNoteShow from "@/pages/UserNoteShow";
import { useForm } from "react-hook-form";
import useRequireLogin from "@/components/useRequireLogin";


const CreateNote = () => {
  useRequireLogin();
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false); // new state variable
  const router = useRouter();

  const { register, handleSubmit, errors, reset } = useForm();

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userId = authUser.uid;
        try {
          const response = await axios.get(`/users/${userId}`);
          setUser({
            ...response.data,
            image_url: response.data.image_url || "/default_profile2.png",
          });
          // Reset form with the new values
          reset({
            bio: response.data.bio,
            username: response.data.username,
          });
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.error("User not found");
            setUser({
              image_url: "/default_profile2.png",
            });
          } else {
            console.error(error);
          }
        }
      } else {
        setUser(null);
      }
    });

    return () => unSub();
  }, []);

  const submitForm = async (data, e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("サインインしてください。");
      return;
    }

    const fd = new FormData();
    fd.append("user[user_id]", auth.currentUser.uid);
    fd.append("user[bio]", data.bio);
    fd.append("user[username]", data.username);

    if (selectedFile) {
      fd.append("user[image]", selectedFile, selectedFile.name);
    }

    const response = await axios.put(`/users/${auth.currentUser.uid}`, fd);

    setUser({
      ...user,
      image_url: response.data.image_url,
    });

    setShowModal(true);
    // setSubmitted(true); // set this to true after form is submitted

    setTimeout(() => {
      setShowModal(false);
      window.location.reload();
    }, 1);
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
          <h3 className="text-center text-3xl mb-2">プロフィール</h3>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex justify-center items-center">
              {user && (
                <img
                  src={user.image_url}
                  alt="User profile"
                  className="rounded-full h-32"
                />
              )}
            </div>

            <div className="flex justify-center items-center">
              <input
                type="file"
                onChange={fileSelectedHandler}
                className="flex justify-center items-center"
              />
            </div>

            <div className="py-2 flex justify-center items-center mt-8">
              <input
                {...register("bio")}
                type="text"
                name="bio"
                className=" px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                placeholder="担当（例:6年1組）"
              />
            </div>

            <div className="py-2 flex justify-center items-center">
              <input
                {...register("username")}
                type="text"
                name="username"
                className=" px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                placeholder="ユーザーネーム"
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                更新する
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNote;
