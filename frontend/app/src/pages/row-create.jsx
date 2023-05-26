import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); //ノートの内容を格納するためのステートを作成します。
  const router = useRouter(); // useRouterを呼び出してrouterオブジェクトを取得します。

  const submitForm = async (e) => {
    e.preventDefault(); //デフォルトのイベント動作（この場合はフォームの送信によるページのリロード）を防止します。

    const note = {
      title: title, //ノートのタイトルと内容をステートから取得して、オブジェクトに格納します。
      content: content, //ノートのタイトルと内容をステートから取得して、オブジェクトに格納します。
    }; //ノートのタイトルと内容をステートから取得して、オブジェクトに格納します。
    // await axios.post("http://localhost:3000/api/v1/notes", note); //ノートを作成するために、axiosを使ってAPIを呼び出します。
    await axios.post("/notes", note); //ノートを作成するために、axiosを使ってAPIを呼び出します。

    setTitle(""); //ノートが作成された後でステートをリセットするため
    setContent(""); //ノートが作成された後でステートをリセットするため
    router.push("/"); //ノートが作成された後に、トップページに遷移するようにします。
  };

  return (
    <>
      <h2>メモ作成</h2>
      <form onSubmit={submitForm}>
        <div>
          <input
            placeholder="Titleを入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)} //タイトルの入力欄に入力された値をステートに格納するようにします。
          />
        </div>
        <div>
          <textarea
            placeholder="Contentを入力"
            value={content}
            onChange={(e) => setContent(e.target.value)} //内容の入力欄に入力された値をステートに格納するようにします。
          />
        </div>
        <div>
          <button type="submit">送信</button>
        </div>
      </form>
    </>
  );
};
export default CreateNote; //このファイルをエクスポートして、他のファイルからインポートできるようにします。
