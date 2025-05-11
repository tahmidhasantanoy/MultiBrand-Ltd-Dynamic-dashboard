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
      <h1 className="text-2xl font-bold text-center my-8">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default ManageUser;
