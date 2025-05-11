import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useCreateNewUserInfoMutation } from "../../Redux/api/manageUsersApi";

const AddUser = () => {
  const { user, loading } = useContext(AuthContext);
  const email = user?.email;
  const [createNewUserInfo] = useCreateNewUserInfoMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (email) {
      setValue("authority", email);
    }
  }, [email, setValue]);

  const onSubmit = async (data) => {
    if (loading) {
      <p>Loading ...</p>;
    }

    const { name, userEmail, phone, dob, status } = data;

    const addedUserData = {
      name,
      userEmail,
      phone,
      dob,
      status,
      authority: email,
    };

    // Server action
    const responseFromServer = await createNewUserInfo(addedUserData);
    if (responseFromServer?.data?.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow border border-black space-y-3"
    >
      <h2 className="text-xl font-bold text-center text-black mb-4">
        Add User
      </h2>

      <div>
        <label className="block text-sm font-medium text-black">Name</label>
        <input
          type="text"
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
          <option value="failed">Failed</option>
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
        Submit
      </button>
    </form>
  );
};

export default AddUser;
