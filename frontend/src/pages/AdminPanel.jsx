import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [confs, setConfs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/conferences").then(res => setConfs(res.data));
  }, []);

  const del = async (id) => {
    await API.delete(`/conferences/${id}`);
    setConfs(confs.filter(c => c._id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Admin Panel
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {confs.map(c => (
          <div
            key={c._id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{c.title}</h2>
            <p className="text-gray-600 mb-3">{c.description}</p>
            
            <p className="text-sm text-gray-500 mb-4">
              Registrations: <span className="font-medium">{c.registrations}</span>
            </p>

            <div className="flex justify-between">
              {/* Outlined Delete Button */}
              <button
                onClick={() => del(c._id)}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
              >
                Delete
              </button>

              {/* Filled View Button */}
              <button
                onClick={() => navigate(`/admin/conference/${c._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
