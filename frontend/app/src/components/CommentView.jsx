import { useEffect, useState } from "react";
import axios from "axios";

const CommentView = ({ location_id }) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get(`/notes?location_id=${location_id}`);
      setNotes(response.data);
      console.log(response.data);
    };

    if (location_id) fetchNotes();
  }, [location_id]);

  return (
    <>
      <div>
        <h1 className="text-xl text-center font-bold border-b my-10">
          この施設へのコメント
        </h1>
        <ul role="list" className="">
          {notes.map((note) => (
            <li key={note.id} className="flex justify-between gap-x-6 py-3">
              <div className=" p-2 rounded-lg shadow-lg space-x-2 w-full bg-stone-100 border">
                <div className="flex gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={
                      note.user?.image_url
                        ? note.user?.image_url
                        : "/default_profile2.png"
                    }
                    alt={note.user?.username}
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {note.user?.username}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {new Intl.DateTimeFormat("ja-JP", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(note.created_at))}
                    </p>
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {note.title}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {note.content}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CommentView;
