import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetUsersInfoQuery } from "../../Redux/api/manageUsersApi";

const EditUser = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetUsersInfoQuery();
  const users = data?.data;

  console.log(users); 
  console.log(id); 

  const clickedUser = useMemo(() => {
    return Array.isArray(users) && users.find((user) => user._id === id);
  }, [users, id]);

  console.log(clickedUser);

  return <div>{clickedUser?.name}</div>;
};

export default EditUser;
