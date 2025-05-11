import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteUserInfoMutation } from "../../Redux/api/manageUsersApi";

const UserCard = ({ user }) => {
  const [deleteUserInfo] = useDeleteUserInfoMutation();
  const { _id, name, userEmail, phone, dob, authority, createdAt, status } =
    user;

  const handleDeleteUser = (deletedUserId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const responseFromServer = await deleteUserInfo(deletedUserId);
          console.log(responseFromServer);

          if (responseFromServer?.data?.success) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Deleted Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  return (
    <div className="bg-gray-50 rounded-2xl shadow-md p-6 max-w-md w-full border border-gray-300 hover:shadow-2xl transition duration-300 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-xs text-gray-400 mt-1">
            added on {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-3 py-0.5 text-xs rounded-full font-semibold text-white ${
            status === "active"
              ? "bg-green-500"
              : status === "inactive"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-semibold">📧 Email:</span> {userEmail}
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
          <Link to={`/dashboard/manage-users/edit-user/${_id}`}>✏️ Edit</Link>
        </button>
        <button
          onClick={() => handleDeleteUser(_id)}
          className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1.5 rounded-full shadow-sm transition"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
