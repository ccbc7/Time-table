import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async (userId) => {
      const response = await axios.get(`/notes?user_id=${userId}`);
      setNotes(response.data);
    };

    const unSub = auth.onAuthStateChanged((user) => {
      if (user) fetchNotes(user.uid); // ログインしている場合はノートを取得
    });

    return () => unSub(); // Clean up
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
      <h1 className="text-3xl text-center font-bold">All memos</h1>
      <div className="my-4 flex justify-center">
        <table className="border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2 bg-violet-200">
                イメージ
              </th>
              <th className="border border-black px-4 py-2 bg-violet-200">
                ユーザーID
              </th>
              <th className="border border-black px-4 py-2 bg-violet-200">
                ID
              </th>
              <th className="border border-black px-4 py-2 bg-violet-200">
                作成日時
              </th>
              <th className="border border-black px-4 py-2 bg-violet-200">
                タイトル
              </th>
              <th className="border border-black px-4 py-2 bg-violet-200">
                コンテンツ
              </th>
              <th className="border border-black px-4 py-2 bg-violet-200">
                削除
              </th>
              <th className="border border-black px-4 py-2 bg-violet-200">
                削除
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td className="border border-black px-4 py-2">
                  <img src={note.image_url} alt={note.title} className="h-10" />
                </td>

                <td className="border border-black px-4 py-2">
                  {note.user_id}
                </td>
                <td className="border border-black px-4 py-2">{note.id}</td>
                <td className="border border-black px-4 py-2">
                  {new Intl.DateTimeFormat("ja-JP", {
                    dateStyle: "full",
                    timeStyle: "medium",
                  }).format(new Date(note.created_at))}
                </td>
                <td className="border border-black px-4 py-2">{note.title}</td>
                <td className="border border-black px-4 py-2">
                  {note.content}
                </td>
                <td className="border border-black px-4 py-2">
                  <button onClick={() => deleteNote(note.id)}>削除</button>
                </td>
                <td className="border border-black px-4 py-2">
                  <Link href={`/edit/${note.id}`}>
                    編集
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Link href="/create">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded text-center">
            メモ作成
          </button>
        </Link>
      </div>
    </>
  );
};

export default Notes;
