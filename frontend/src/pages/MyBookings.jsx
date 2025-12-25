// import API from "../api/api";
// import { useEffect, useState } from "react";

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     API.get("/bookings/my").then(res => setBookings(res.data));
//   }, []);

//   return (
//     <div className="pt-24 px-6 pb-12 bg-gray-50 min-h-screen">
//       {/* Colorful heading */}
//       <h1 className="text-4xl font-extrabold mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//         My Booked Conferences
//       </h1>

//       {bookings.length === 0 && (
//         <p className="text-gray-500 text-lg">
//           You have not booked any conferences yet.
//         </p>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {bookings.map((b) => (
//           <div
//             key={b._id}
//             className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
//           >
//             <h2 className="text-2xl font-bold mb-2 text-gray-800">
//               {b.conferenceId.title}
//             </h2>
//             <p className="mb-2 text-gray-600">{b.conferenceId.description}</p>
//             <p className="text-sm text-gray-500 mb-1">📍 {b.conferenceId.location}</p>
//             <p className="text-sm text-gray-500 mb-3">📅 {b.conferenceId.date}</p>

//             <span className="inline-block mt-2 px-4 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full">
//               Booked
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import API from "../api/api";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  useEffect(() => {
    API.get("/bookings/my").then(res => setBookings(res.data));
  }, []);

  const saveFeedback = async (id) => {
    await API.put(`/bookings/${id}/feedback`, { feedback: feedbackText });
    setEditingId(null);
    window.location.reload();
  };

  const deleteFeedback = async (id) => {
    await API.delete(`/bookings/${id}/feedback`);
    window.location.reload();
  };

  return (
    <div className="pt-24 px-6 pb-12 bg-gray-50 min-h-screen">
      {/* Gradient heading */}
      <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        My Booked Conferences
      </h1>

      {bookings.length === 0 && (
        <p className="text-gray-500 text-lg">
          You have not booked any conferences yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => {
          const isEditing = editingId === b._id;

          return (
            <div
              key={b._id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              {/* Conference info */}
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {b.conferenceId.title}
              </h2>
              <p className="text-gray-600 mb-2">
                {b.conferenceId.description}
              </p>

              <p className="text-sm text-gray-500">📍 {b.conferenceId.location}</p>
              <p className="text-sm text-gray-500 mb-4">
                📅 {b.conferenceId.date}
              </p>

              {/* Status */}
              <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full">
                Booked
              </span>

              {/* Feedback section */}
              <div className="border-t pt-4 mt-4">
                {!b.feedback && !isEditing && (
                  <button
                    onClick={() => {
                      setEditingId(b._id);
                      setFeedbackText("");
                    }}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    + Add Feedback
                  </button>
                )}

                {b.feedback && !isEditing && (
                  <>
                    <p className="italic text-gray-700 mb-2">
                      “{b.feedback}”
                    </p>
                    <div className="flex gap-4 text-sm">
                      <button
                        onClick={() => {
                          setEditingId(b._id);
                          setFeedbackText(b.feedback);
                        }}
                        className="text-indigo-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFeedback(b._id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}

                {isEditing && (
                  <div className="mt-3">
                    <textarea
                      rows="3"
                      className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Write your feedback..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                    />

                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => saveFeedback(b._id)}
                        className="px-4 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-1 text-sm rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
