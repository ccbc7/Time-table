import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Home from "../components/Home";
import { auth, provider } from "../utils/firebase";


const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false); // モーダル表示のステートを追加
  const router = useRouter(); // useRouterを呼び出してrouterオブジェクトを取得します。

  const submitForm = async (e) => {
    e.preventDefault(); //これはイベントハンドラ内で頻繁に見る一行で、デフォルトのイベント動作（この場合はフォームの送信によるページのリロード）を防止します。
    if (!auth.currentUser) {
      // ユーザーがログインしていなければ
      alert("サインインしてください。"); // アラートを表示
      return; // 関数から抜ける
    }

    const note = {
      title: title,
      content: content,
      user_id: auth.currentUser.uid, // ユーザーIDを追加
    };

    await axios.post("/notes", note);
    setTitle("");
    setContent(""); //ノートが作成された後でステートをリセットするため
    // router.push("/"); //ノートが作成された後に、トップページに遷移するようにします。
    setShowModal(true); // 送信が成功したらモーダルを表示
    setTimeout(() => {
      setShowModal(false); // 2秒後にモーダルを非表示に
      router.push("/"); // その後トップページに遷移
    }, 1000);
  };

  return (
    <>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="inline-block bg-purple-400 rounded p-5 text-lg text-black">
              送信しました
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="max-w-md w-full space-y-8 py-6">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            メモ作成
          </h2>
          <form className="mt-8 space-y-6" onSubmit={submitForm}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="title" className="sr-only">
                  Title
                </label>
                <input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Titleを入力"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label for="content" className="sr-only">
                  Content
                </label>
                <textarea
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contentを入力"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                送信
              </button>
            </div>
          </form>
        </div>
        <Home />
      </div>
    </>
  );
};

export default CreateNote;
