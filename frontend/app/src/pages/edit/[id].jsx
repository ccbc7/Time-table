// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";



// const Edit = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [note, setNote] = useState({ title: "", content: "" });

//   useEffect(() => {
//     if (id) {
//       const fetchNote = async () => {
//         const response = await axios.get(`/notes/${id}`);
//         setNote(response.data);
//       };

//       fetchNote();
//     }
//   }, [id]);

//   const updateNote = async (e) => {
//     e.preventDefault();

//     await axios.put(`/notes/${id}`, note);
//     router.push("/");
//   };

//   return (
//     <div>
//       <h1>Edit Note</h1>
//       <form onSubmit={updateNote}>
//         <input
//           type="text"
//           value={note.title}
//           onChange={(e) => setNote({ ...note, title: e.target.value })}
//         />
//         <textarea
//           value={note.content}
//           onChange={(e) => setNote({ ...note, content: e.target.value })}
//         />
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default Edit;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

// const Edit = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [note, setNote] = useState({ title: "", content: "" });

//   useEffect(() => {
//     if (id) {
//       const fetchNote = async () => {
//         const response = await axios.get(`/notes/${id}`);
//         setNote(response.data);
//       };

//       fetchNote();
//     }
//   }, [id]);

//   const fileSelectedHandler = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const updateNote = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     fd.append("note[title]", note.title);
//     fd.append("note[content]", note.content);
//     fd.append("note[user_id]", note.user_id); // user_id should be fetched and updated
//     if (selectedFile) {
//       fd.append("note[image]", selectedFile, selectedFile.name);
//     }

//     await axios.put(`/notes/${id}`, fd);
//     router.push("/NotesShow");
//   };

//   return (
//     <div>
//       <h1>Edit Note</h1>
//       <form onSubmit={updateNote}>
//         <input
//           type="text"
//           value={note.title}
//           onChange={(e) => setNote({ ...note, title: e.target.value })}
//         />
//         <textarea
//           value={note.content}
//           onChange={(e) => setNote({ ...note, content: e.target.value })}
//         />
//         <input type="file" onChange={fileSelectedHandler} />
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default Edit;

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedFile, setSelectedFile] = useState(null);
  const [note, setNote] = useState({ title: "", content: "", image_url: null }); // Add image_url field

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        const response = await axios.get(`/notes/${id}`);
        setNote(response.data); // Ensure the image_url is included in the data returned from API
      };

      fetchNote();
    }
  }, [id]);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const updateNote = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("note[title]", note.title);
    fd.append("note[content]", note.content);
    fd.append("note[user_id]", note.user_id); // user_id should be fetched and updated
    if (selectedFile) {
      fd.append("note[image]", selectedFile, selectedFile.name);
    }

    await axios.put(`/notes/${id}`, fd);
    router.push("/NotesShow");
  };

  return (
    <div>
      <h1>Edit Note</h1>
      <form onSubmit={updateNote}>
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })} //
        />
        <textarea
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />
        <input type="file" onChange={fileSelectedHandler} />
        {note.image_url && <img src={note.image_url} alt="note" className="rounded-full h-20"/>}{" "}
        {/* Show image when the URL is available */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Edit;
