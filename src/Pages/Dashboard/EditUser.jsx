import React, { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  useGetUsersInfoQuery,
  useUpdateUserInfoMutation,
} from "../../Redux/api/manageUsersApi";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const EditUser = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetUsersInfoQuery();
  const { user } = useContext(AuthContext);
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const email = user?.email;
  const users = data?.data;

  const clickedUser = useMemo(() => {
    return Array.isArray(users) && users.find((user) => user._id === id);
  }, [users, id]);

  const { _id, name, userEmail, phone, dob } = clickedUser;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (clickedUser) {
      setValue("name", clickedUser.name);
      setValue("userEmail", clickedUser.userEmail);
      setValue("phone", clickedUser.phone);
      setValue("dob", clickedUser.dob);
      setValue("status", clickedUser.status);
    }
    if (email) {
      setValue("authority", email);
    }
  }, [clickedUser, email, setValue]);

  const onSubmit = async (data) => {
    if (isLoading) return <p>Loading ...</p>;

    if (isError) return <p>Something went wrong</p>;

    const userId = _id;
    // console.log(_id, "userId");

    const updateUserData = {
      name: data.name,
      userEmail: data.userEmail,
      phone: data.phone,
      dob: data.dob,
      status: data.status,
      authority: email,
    };

    try {
      const responseFromServer = await updateUserInfo({
        id: userId,
        updatedData: updateUserData,
      });
      if (responseFromServer?.data?.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow border border-black space-y-3"
    >
      <h2 className="text-xl font-bold text-center text-black mb-4">
        Edit User
      </h2>

      <div>
        <label className="block text-sm font-medium text-black">Name</label>
        <input
          type="text"
          defaultValue={name}
          {...register("name", { required: "Name is required" })}
          className="mt-1 block w-full rounded border border-black p-2 focus:outline-none focus:ring-1 focus:ring-black"
        />
        {errors.name && (
          <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Email</label>
        <input
          type="email"
          defaultValue={userEmail}
          {...register("userEmail", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          className="mt-1 block w-full rounded border border-black p-2 focus:outline-none focus:ring-1 focus:ring-black"
        />
        {errors.userEmail && (
          <p className="text-red-600 text-xs mt-1">
            {errors.userEmail.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Phone</label>
        <input
          type="tel"
          defaultValue={phone}
          {...register("phone", {
            required: "Phone number is required",
            minLength: { value: 10, message: "At least 10 digits" },
            pattern: { value: /^[0-9]+$/, message: "Numbers only" },
          })}
          className="mt-1 block w-full rounded border border-black p-2 focus:outline-none focus:ring-1 focus:ring-black"
        />
        {errors.phone && (
          <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Date of Birth
        </label>
        <input
          type="date"
          defaultValue={dob}
          {...register("dob", { required: "Date of birth is required" })}
          className="mt-1 block w-full rounded border border-black p-2 focus:outline-none focus:ring-1 focus:ring-black"
        />
        {errors.dob && (
          <p className="text-red-600 text-xs mt-1">{errors.dob.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Status</label>
        <select
          {...register("status", { required: "Status is required" })}
          className="mt-1 block w-full rounded border border-black p-2 focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="">Select status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className="text-red-600 text-xs mt-1">{errors.status.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-black">
          Authority
        </label>
        <input
          defaultValue={email}
          readOnly
          type="tel"
          {...register("authority", {})}
          className="mt-1 block w-full rounded border"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-opacity-90 transition duration-300"
      >
        Update
      </button>
    </form>
  );
};

export default EditUser;
