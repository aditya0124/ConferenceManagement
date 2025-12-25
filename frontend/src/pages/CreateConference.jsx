import API from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateConference() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    await API.post("/conferences", form);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Create Conference</h2>
        <input
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Date"
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
        <input
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Location"
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <button
          onClick={submit}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Create
        </button>
      </div>
    </div>
  );
}
