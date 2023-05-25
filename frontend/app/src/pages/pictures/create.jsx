import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

function Create() {
  const [selectedFile, setSelectedFile] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/pictures").then((response) => {
      const imagesData = response.data.map((picture) => picture.image_url);
      setImages(imagesData);
    });
  }, []);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]); // event.target.files[0] は選択したファイル
  };

  const fileUploadHandler = () => {
    const fd = new FormData(); // FormData はフォームデータを扱うためのクラス
    fd.append("picture[image]", selectedFile, selectedFile.name);
    axios.post("http://localhost:3000/api/v1/pictures", fd).then((res) => {
      console.log(res);
      setUploadedImage(res.data.image_url); // アップロードした写真のURLを保存します。
      setImages([...images, res.data.image_url]); // アップロードした画像をimages配列に追加します。
    });
  };

  return (
    <div>
      <input type="file" onChange={fileSelectedHandler} />
      <button onClick={fileUploadHandler}>Upload</button>
      {uploadedImage && (
        <div>
          <h2>Uploaded Image</h2>
          <img
            className="w-18 h-18 object-cover"
            src={uploadedImage}
            alt="Uploaded"
          />
        </div>
      )}
      {images.length > 0 && ( // images 配列の要素数が 0 より大きい場合にのみ、画像を表示します。
        <div>
          <h2>All Uploaded Images</h2>
          {images.map((imageUrl, index) => (
            <img
              className="w-18 h-18 object-cover"
              key={index}
              src={imageUrl}
              alt={`Uploaded ${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Create;
