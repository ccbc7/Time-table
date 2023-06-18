import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";

const OnlyPicture = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async (userId) => {
      const response = await axios.get(`/users?user_id=${userId}`);
      setUsers(response.data);
    };

    const unSub = auth.onAuthStateChanged((user) => {
      if (user) fetchUsers(user.uid);
    });

    return () => unSub(); // Clean up
  }, []);

  return (
    <>
      <div className="my-4 flex justify-center">
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <img
                src={user.image_url}
                className="h-8 rounded-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default OnlyPicture;
