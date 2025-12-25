// import API from "../api/api";
// import { useEffect, useState } from "react";

// export default function Conferences() {
//   const [confs, setConfs] = useState([]);
//   const [myBookings, setMyBookings] = useState([]);

// //   



//   // Fetch all conferences and my bookings
//   useEffect(() => {
//     API.get("/conferences").then(res => setConfs(res.data));
//     API.get("/bookings/my").then(res => setMyBookings(res.data));
//   }, []);

//   // Check if conference already booked
//   const isBooked = (confId) => {
//     return myBookings.some(
//       b => b.conferenceId._id === confId
//     );
//   };

//   // Book conference
//   const bookConference = async (confId) => {
//     try {
//       await API.post("/bookings", { conferenceId: confId });
//       alert("Conference booked successfully");

//       // Refresh bookings
//       const res = await API.get("/bookings/my");
//       setMyBookings(res.data);
//     } catch (err) {
//       alert("Already booked or error occurred");
//     }
//   };

//   return (
//     <div className="pt-24 px-6 pb-12 bg-gray-50 min-h-screen">
//       <h1 className="text-4xl font-extrabold mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//         Available Conferences
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {confs.map(c => {
//           const booked = isBooked(c._id);

//           return (
//             <div
//               key={c._id}
//               className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
//             >
//               <h2 className="text-2xl font-bold mb-2 text-gray-800">{c.title}</h2>
//               <p className="mb-2 text-gray-600">{c.description}</p>
//               <p className="text-sm text-gray-500 mb-3">📍 {c.location} | 📅 {c.date}</p>

//               <button
//                 disabled={booked}
//                 onClick={() => bookConference(c._id)}
//                 className={`mt-3 w-full px-4 py-2 rounded font-semibold transition-colors
//                   ${booked 
//                     ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
//                     : "bg-blue-600 text-white hover:bg-blue-700"}
//                 `}
//               >
//                 {booked ? "Booked" : "Book"}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import API from "../api/api";
import { useEffect, useState } from "react";

export default function Conferences() {
  const [confs, setConfs] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  // feedback state
  const [openConfId, setOpenConfId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch all conferences and my bookings
  useEffect(() => {
    API.get("/conferences").then(res => setConfs(res.data));
    API.get("/bookings/my").then(res => setMyBookings(res.data));
  }, []);

  const isBooked = (confId) =>
    myBookings.some(b => b.conferenceId._id === confId);

  const bookConference = async (confId) => {
    try {
      await API.post("/bookings", { conferenceId: confId });
      alert("Conference booked successfully");
      const res = await API.get("/bookings/my");
      setMyBookings(res.data);
    } catch {
      alert("Already booked or error occurred");
    }
  };

  // LOAD FEEDBACK (PUBLIC)
  const loadFeedback = async (confId) => {
    if (openConfId === confId) {
      setOpenConfId(null);
      return;
    }

    const res = await API.get(`/conferences/${confId}/registrations`);
    setFeedbacks(res.data.filter(r => r.feedback));
    setOpenConfId(confId);
  };

  return (
    <div className="pt-24 px-6 pb-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Available Conferences
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {confs.map(c => {
          const booked = isBooked(c._id);

          return (
            <div
              key={c._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-bold text-gray-800">{c.title}</h2>
              <p className="text-gray-600">{c.description}</p>
              <p className="text-sm text-gray-500 mb-3">
                📍 {c.location} | 📅 {c.date}
              </p>

              <button
                disabled={booked}
                onClick={() => bookConference(c._id)}
                className={`w-full py-2 rounded font-semibold ${
                  booked
                    ? "bg-gray-300 text-gray-600"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {booked ? "Booked" : "Book"}
              </button>

              {/* VIEW FEEDBACK */}
              <button
                onClick={() => loadFeedback(c._id)}
                className="mt-3 text-sm text-indigo-600 underline"
              >
                💬 View Feedback
              </button>

              {/* FEEDBACK LIST */}
              {openConfId === c._id && (
                <div className="mt-3 bg-gray-100 p-3 rounded">
                  {feedbacks.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No feedback yet.
                    </p>
                  )}

                  {feedbacks.map(f => (
                    <p
                      key={f._id}
                      className="italic text-sm mb-2 border-b pb-1"
                    >
                      “{f.feedback}”
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
