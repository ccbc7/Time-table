import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase";

const EditUser = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/${id}`);
      setUser(response.data);
    };

    fetchUser();
  }, [id]);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("サインインしてください。");
      return;
    }

    const fd = new FormData();
    fd.append("user[user_id]", auth.currentUser.uid);
    if (selectedFile) {
      fd.append("user[image]", selectedFile, selectedFile.name);
    }

    await axios.put(`/users/${id}`, fd); 
    router.push("/ProfileEdit");
  };

  return (
    <div>
      <input type="file" onChange={fileSelectedHandler} />
      <button onClick={submitForm}>Update</button>
    </div>
  );
};

export default EditUser;
