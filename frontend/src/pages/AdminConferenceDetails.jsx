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

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Registered Users
      </h2>

      {registrations.length === 0 && (
        <p>No registrations yet.</p>
      )}

      {registrations.map(r => (
        <div key={r._id} className="border p-3 mb-2">
          <p><b>Name:</b> {r.userId.name}</p>
          <p><b>Email:</b> {r.userId.email}</p>
        </div>
      ))}
    </div>
  );
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../api/api";

// export default function AdminConferenceDetails() {
//   const { id } = useParams();
//   const [regs, setRegs] = useState([]);

//   useEffect(() => {
//     API.get(`/conferences/${id}/registrations`)
//       .then(res => setRegs(res.data));
//   }, [id]);

//   const deleteFeedback = async (bookingId) => {
//     await API.delete(`/bookings/admin/${bookingId}/feedback`);
//     alert("Feedback removed");
//     window.location.reload();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Registered Users</h2>

//       {regs.length === 0 && <p>No registrations</p>}

//       {regs.map(r => (
//         <div key={r._id} className="border p-3 mb-3 rounded">
//           <p><b>{r.userId.name}</b> ({r.userId.email})</p>

//           {r.feedback && (
//             <>
//               <p className="italic mt-1">“{r.feedback}”</p>
//               <button
//                 onClick={() => deleteFeedback(r._id)}
//                 className="text-red-600 text-sm"
//               >
//                 Remove Feedback
//               </button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
