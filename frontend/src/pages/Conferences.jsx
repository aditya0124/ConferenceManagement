import API from "../api/api";
import { useEffect, useState } from "react";

export default function Conferences() {
  const [confs, setConfs] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  // Fetch all conferences and my bookings
  useEffect(() => {
    API.get("/conferences").then(res => setConfs(res.data));
    API.get("/bookings/my").then(res => setMyBookings(res.data));
  }, []);

  // Check if conference already booked
  const isBooked = (confId) => {
    return myBookings.some(
      b => b.conferenceId._id === confId
    );
  };

  // Book conference
  const bookConference = async (confId) => {
    try {
      await API.post("/bookings", { conferenceId: confId });
      alert("Conference booked successfully");

      // Refresh bookings
      const res = await API.get("/bookings/my");
      setMyBookings(res.data);
    } catch (err) {
      alert("Already booked or error occurred");
    }
  };

  return (
    <div className="pt-24 px-6 pb-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Available Conferences
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {confs.map(c => {
          const booked = isBooked(c._id);

          return (
            <div
              key={c._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{c.title}</h2>
              <p className="mb-2 text-gray-600">{c.description}</p>
              <p className="text-sm text-gray-500 mb-3">📍 {c.location} | 📅 {c.date}</p>

              <button
                disabled={booked}
                onClick={() => bookConference(c._id)}
                className={`mt-3 w-full px-4 py-2 rounded font-semibold transition-colors
                  ${booked 
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
                    : "bg-blue-600 text-white hover:bg-blue-700"}
                `}
              >
                {booked ? "Booked" : "Book"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// import API from "../api/api";
// import { useEffect, useState } from "react";

// export default function Conferences() {
//   const [confs, setConfs] = useState([]);
//   const [myBookings, setMyBookings] = useState([]);

//   useEffect(() => {
//     API.get("/conferences").then(res => setConfs(res.data));
//     API.get("/bookings/my").then(res => setMyBookings(res.data));
//   }, []);

//   const isBooked = (id) =>
//     myBookings.some(b => b.conferenceId._id === id);

//   const getFeedback = (id) =>
//     myBookings.find(b => b.conferenceId._id === id)?.feedback;

//   const book = async (id) => {
//     await API.post("/bookings", { conferenceId: id });
//     alert("Conference booked");
//     const res = await API.get("/bookings/my");
//     setMyBookings(res.data);
//   };

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {confs.map(c => {
//         const booked = isBooked(c._id);
//         const feedback = getFeedback(c._id);

//         return (
//           <div key={c._id} className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-bold">{c.title}</h2>
//             <p>{c.description}</p>
//             <p className="text-sm text-gray-600">
//               📅 {c.date} | ⏰ {c.time}
//             </p>

//             {feedback && (
//               <p className="italic mt-2 text-gray-700">
//                 “{feedback}”
//               </p>
//             )}

//             <button
//               disabled={booked}
//               onClick={() => book(c._id)}
//               className={`mt-4 px-4 py-2 rounded text-white ${
//                 booked
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700"
//               }`}
//             >
//               {booked ? "Booked" : "Book"}
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

