import axios from "axios";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { auth } from "@/utils/firebase";

function Create() {
  const [selectedFile, setSelectedFile] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    axios.get("/pictures").then((response) => {
      setImages(response.data);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.log("User is not logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("picture[image]", selectedFile, selectedFile.name);

    if (userId) {
      fd.append("user_id", userId);

      axios.post("/pictures", fd).then((res) => {
        console.log(res);
        setUploadedImage(res.data.image_url);
        setImages([...images, res.data]);
      });
    } else {
      console.log("User is not logged in.");
    }
  };

  const deleteImageHandler = (id) => {
    axios.delete(`/pictures/${id}`).then(() => {
      setImages(images.filter((image) => image.id !== id));
    });
  };

  return (
    <>
      <Header />
      <p>User ID: {userId}</p>
      <div>
        <input type="file" onChange={fileSelectedHandler} />
        <button
          className="bg-blue-500 ml-4 px-3 hover:ring-4 ring-indigo-300 rounded-md"
          onClick={fileUploadHandler}
        >
          Upload
        </button>
        {uploadedImage && (
          <div>
            <h2>Uploaded Image</h2>
            <img
              className="w-16 h-16 object-cover"
              src={uploadedImage}
              alt="Uploaded"
            />
          </div>
        )}
        {images.length > 0 && (
          <div>
            <h2>All Uploaded Images</h2>
            <div className="flex flex-wrap">
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    className="w-16 h-16 object-cover mx-2 my-2"
                    src={image.image_url}
                    alt={`Uploaded ${index}`}
                  />
                  <p>{image.id}</p>
                  <p>{image.user_id}</p>
                  <button onClick={() => deleteImageHandler(image.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Create;
