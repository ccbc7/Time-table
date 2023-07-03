import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { auth } from "../utils/firebase";
import { useForm } from "react-hook-form";
import UseRequireLogin from "@/components/UseRequireLogin";
import Link from "next/link";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";

const CreateNote = () => {
  UseRequireLogin();
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false); // new state variable
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

    setSubmitted(true);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      window.location.reload();
    }, 1000);
  };
  const rules = {
    required: "入力してください",
    maxLength: { value: 20, message: `20文字以内で入力してください。` },
  };

  return (
    <>
      <Header />
      {submitted && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="bg-gray-100 flex items-center justify-center pt-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
            <div className="flex justify-center items-center my-8">
              <input
                type="file"
                onChange={fileSelectedHandler}
                className="flex justify-center items-center"
              />
            </div>
            <table className="w-full">
              <tbody>
                <tr>
                  <th className="text-right pr-2">
                    <label className="self-center">担当:</label>
                  </th>
                  <td className="text-center">
                    <input
                      {...register("bio", rules)}
                      type="text"
                      name="bio"
                      className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                      placeholder="担当（例:6年1組）"
                    />
                    {errors.bio && (
                      <p className="text-red-500">{errors.bio.message}</p>
                    )}
                  </td>
                </tr>

                <tr>
                  <th className="text-right pr-2">
                    <label className="self-center">ユーザーネーム:</label>
                  </th>
                  <td className="text-center">
                    <input
                      {...register("username", rules)}
                      type="text"
                      name="username"
                      className="px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                      placeholder="ユーザーネーム"
                    />
                    {errors.bio && (
                      <p className="text-red-500">{errors.bio.message}</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center items-center my-8">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded w-96"
              >
                更新する
              </button>
            </div>
          </form>
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
      <Footer />
    </>
  );
};

export default CreateNote;
