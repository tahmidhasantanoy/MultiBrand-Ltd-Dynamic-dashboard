import React from "react";
import { useGetUsersInfoQuery } from "../../Redux/api/manageUsersApi";
import UserCard from "./UserCard";

const ManageUser = () => {
  const { data, isLoading, isError } = useGetUsersInfoQuery();
  const users = data?.data;

  if (isLoading) return <p>Loading ...</p>;

  if (isError) return <p>Something went wrong</p>;

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mt-4 mb-8 border-gray-300">
        All Users
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default ManageUser;
