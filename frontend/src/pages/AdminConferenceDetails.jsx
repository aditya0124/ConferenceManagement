// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../api/api";

// export default function AdminConferenceDetails() {
//   const { id } = useParams();
//   const [registrations, setRegistrations] = useState([]);

//   useEffect(() => {
//     API.get(`/conferences/${id}/registrations`)
//       .then(res => setRegistrations(res.data));
//   }, [id]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">
//         Registered Users
//       </h2>

//       {registrations.length === 0 && (
//         <p>No registrations yet.</p>
//       )}

//       {registrations.map(r => (
//         <div key={r._id} className="border p-3 mb-2">
//           <p><b>Name:</b> {r.userId.name}</p>
//           <p><b>Email:</b> {r.userId.email}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function AdminConferenceDetails() {
  const { id } = useParams();
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    API.get(`/conferences/${id}/registrations`)
      .then(res => setRegistrations(res.data));
  }, [id]);

  const deleteFeedback = async (bookingId) => {
    await API.delete(`/bookings/admin/${bookingId}/feedback`);
    alert("Feedback deleted");
    window.location.reload();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">
        Conference Registrations & Feedback
      </h2>

      {registrations.length === 0 && (
        <p>No registrations yet.</p>
      )}

      {registrations.map(r => (
        <div
          key={r._id}
          className="bg-white p-4 rounded shadow mb-4"
        >
          <p><b>Name:</b> {r.userId.name}</p>
          <p><b>Email:</b> {r.userId.email}</p>

          {r.feedback && (
            <>
              <p className="italic mt-2 text-gray-700">
                “{r.feedback}”
              </p>
              <button
                onClick={() => deleteFeedback(r._id)}
                className="mt-2 text-red-600 text-sm underline"
              >
                Delete Feedback
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
