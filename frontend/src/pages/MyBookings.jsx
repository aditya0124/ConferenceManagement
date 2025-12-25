import API from "../api/api";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/my").then(res => setBookings(res.data));
  }, []);

  return (
    <div className="pt-24 px-6 pb-12 bg-gray-50 min-h-screen">
      {/* Colorful heading */}
      <h1 className="text-4xl font-extrabold mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        My Booked Conferences
      </h1>

      {bookings.length === 0 && (
        <p className="text-gray-500 text-lg">
          You have not booked any conferences yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {b.conferenceId.title}
            </h2>
            <p className="mb-2 text-gray-600">{b.conferenceId.description}</p>
            <p className="text-sm text-gray-500 mb-1">📍 {b.conferenceId.location}</p>
            <p className="text-sm text-gray-500 mb-3">📅 {b.conferenceId.date}</p>

            <span className="inline-block mt-2 px-4 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full">
              Booked
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import API from "../api/api";
// import { useEffect, useState } from "react";

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [feedbackText, setFeedbackText] = useState({});

//   useEffect(() => {
//     API.get("/bookings/my").then(res => setBookings(res.data));
//   }, []);

//   const addFeedback = async (bookingId) => {
//     const text = feedbackText[bookingId];
//     if (!text || text.trim() === "") {
//       alert("Please write feedback first");
//       return;
//     }

//     await API.put(`/bookings/${bookingId}/feedback`, {
//       feedback: text
//     });

//     alert("Feedback added");
//     window.location.reload();
//   };

//   const deleteFeedback = async (id) => {
//     await API.delete(`/bookings/${id}/feedback`);
//     alert("Feedback deleted");
//     window.location.reload();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

//       {bookings.length === 0 && (
//         <p>You have not booked any conferences yet.</p>
//       )}

//       {bookings.map(b => (
//         <div key={b._id} className="bg-white p-4 mb-4 rounded shadow">
//           <h2 className="text-xl font-bold">
//             {b.conferenceId.title}
//           </h2>

//           <p className="text-sm text-gray-600">
//             📅 {b.conferenceId.date} | ⏰ {b.conferenceId.time}
//           </p>

//           {/* FEEDBACK SECTION */}
//           {b.feedback ? (
//             <>
//               <p className="italic mt-3 text-gray-700">
//                 “{b.feedback}”
//               </p>
//               <button
//                 onClick={() => deleteFeedback(b._id)}
//                 className="mt-2 text-red-500 text-sm"
//               >
//                 Delete Feedback
//               </button>
//             </>
//           ) : (
//             <div className="mt-3">
//               <textarea
//                 className="w-full border p-2 rounded"
//                 placeholder="Write your feedback..."
//                 value={feedbackText[b._id] || ""}
//                 onChange={(e) =>
//                   setFeedbackText({
//                     ...feedbackText,
//                     [b._id]: e.target.value
//                   })
//                 }
//               />
//               <button
//                 onClick={() => addFeedback(b._id)}
//                 className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
//               >
//                 Add Feedback
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
