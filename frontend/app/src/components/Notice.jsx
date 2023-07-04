import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "@/utils/firebase";
import Link from "next/link";

function Notice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
  const fetchNotices = async () => {
    const userId = auth.currentUser.uid;
    const response = await axios.get("/reservations", {
      params: { user_id: userId },
    });
    console.log(response.data);
    const sortedNotices = response.data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    const latestNotices = sortedNotices.slice(0, 5);
    setNotices(latestNotices);
  };

    const unSub = auth.onAuthStateChanged((user) => {
      if (user) fetchNotices();
    });

    return () => unSub();
  }, []);

  return (
    <div>
      <h2 className="text-center border-b">お知らせ</h2>
        {notices.map((notice, index) => (
          <div key={index}>
            <div className="hover:bg-gray-200">
            <Link href={`/reservation/edit/${notice.id}`}>
              <p>{notice.message1}</p>
              <p className="border-b-2 pb-2">{notice.message2}</p>
            </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Notice;
