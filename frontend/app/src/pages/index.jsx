import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]); //ノートの一覧を格納するためのステートを作成します。

  useEffect(() => {
    const fetchNotes = async () => {
      // const response = await axios.get("http://localhost:3000/api/v1/notes");
      const response = await axios.get("/notes");
      setNotes(response.data);
    };

    fetchNotes();
  }, []);

  // const deleteNote = async (id) => {
  //   await axios.delete(`http://localhost:3000/api/v1/notes/${id}`);
  //   setNotes(notes.filter((note) => note.id !== id)); //削除対象のid除いたノートの配列を作成して、ステートに格納しま
  // };
    const deleteNote = async (id) => {
      if (window.confirm("本当に削除しますか？")) {
        // 追加
        // await axios.delete(`http://localhost:3000/api/v1/notes/${id}`);
        await axios.delete(`/notes/${id}`);
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
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td className="border border-black px-4 py-2">{note.id}</td>
                <td className="border border-black px-4 py-2">
                  {new Intl.DateTimeFormat("ja-JP", {
                    //日付をフォーマットするために、Intl.DateTimeFormatを使います。
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
