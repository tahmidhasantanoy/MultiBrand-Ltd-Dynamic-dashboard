import React from "react";

const UserCard = ({ user }) => {
  const { name, email, phone, dob, authority, createdAt, status } = user;
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-md w-full border border-gray-300 hover:shadow-2xl transition duration-300 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-xs text-gray-400 mt-1">
            Joined on {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-3 py-0.5 text-xs rounded-full font-semibold text-white ${
            status === "active" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-semibold">📧 Email:</span> {email}
        </p>
        <p>
          <span className="font-semibold">📱 Phone:</span> {phone}
        </p>
        <p>
          <span className="font-semibold">🎂 DOB:</span> {dob}
        </p>
        <p>
          <span className="font-semibold">🛡️ Authority:</span> {authority}
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1.5 rounded-full shadow-sm transition">
          ✏️ Edit
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1.5 rounded-full shadow-sm transition">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
