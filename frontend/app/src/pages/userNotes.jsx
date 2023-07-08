import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import Header from "@/components/Header";
import Head from "next/head";

const UserNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async (userId) => {
      const response = await axios.get(`/notes?user_id=${userId}`);
      setNotes(response.data);
      console.log(response.data);
    };

    const unSub = auth.onAuthStateChanged((user) => {
      if (user) fetchNotes(user.uid);
    });

    return () => unSub();
  }, []);

  const deleteNote = async (id) => {
    if (window.confirm("本当に削除しますか？")) {
      const userId = auth.currentUser.uid;
      await axios.delete(`/notes/${id}`, { data: { user_id: userId } });
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  return (
    <>
      <Head>
        <title>コメントした施設</title>
      </Head>
      <Header />
      <h1 className="text-3xl text-center font-bold">施設へのコメント一覧</h1>
      <p className="text-center border-b my-3">
        あなたが登録した施設へのコメントを確認できます。
      </p>
      <div className="my-4 flex justify-center">
        <table className="">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-emerald-200">施設名</th>
              <th className="border px-4 py-2 bg-emerald-200">タイトル</th>
              <th className="border px-4 py-2 bg-emerald-200">コンテンツ</th>
              <th className="border px-4 py-2 bg-emerald-200">作成日</th>
              <th className="border px-4 py-2 bg-emerald-200">削除</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {notes.map((note) => (
              <tr key={note.id}>
                <td className="border  px-4 py-2">
                  {note.location?.location_name}
                </td>
                <td className="border  px-4 py-2">{note.title}</td>
                <td className="border  px-4 py-2">{note.content}</td>
                <td className="border  px-4 py-2">
                  {new Intl.DateTimeFormat("ja-JP", {
                    dateStyle: "short",
                    timeStyle: "medium",
                  }).format(new Date(note.created_at))}
                </td>
                <td className="border  px-4 py-2">
                  <button onClick={() => deleteNote(note.id)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserNotes;
