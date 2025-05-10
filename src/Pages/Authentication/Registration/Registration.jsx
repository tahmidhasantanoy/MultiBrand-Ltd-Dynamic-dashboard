/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from "../../../Providers/AuthProvider";
import registerImage from "../../../../public/images/register.svg";
import Swal from "sweetalert2";
// import { useCreateTravelUserMutation } from "../../redux/api/authApi";

const Registration = () => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputFocusPassword, setInputFocusPassword] = useState(false);
  const [inputCFocusPassword, setInputFocusCPassword] = useState(false);

  const { createUser } = useContext(AuthContext);
  //   const [createTravelUser] = useCreateTravelUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { fullname, email, password } = data;

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    const id = Math.floor(Math.random() * 100000);

    createUser(email, password)
      .then(async (res) => {
        const user = res?.user;

        const userData = {
          id: id,
          fullName: fullname,
          email: user?.email,
          role: "user",
        };

        try {
          //   const responseFromServer = await createTravelUser(userData);
          //   console.log(responseFromServer);
        } catch (err) {
          console.log(err.message); //
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  // Update password match state
  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [confirmPassword]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col md:flex-row justify-center items-center bg-white rounded-lg w-full max-w-4xl p-6">
        {/* Left Section - Image */}
        <div className="md:w-1/2 text-center mb-6 md:mb-0">
          <img
            src={registerImage}
            alt="Register Illustration"
            className="mx-auto w-3/4 md:w-full max-w-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-6">
            Create an Account!
          </h2>
          <p className="text-gray-600 mt-2">
            Join us to access amazing features.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name Field */}
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                className={`w-full px-4 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 ${
                  errors.fullname
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500"
                }`}
                placeholder="Enter your full name"
                {...register("fullname", {
                  required: "Full name is required",
                  minLength: {
                    value: 6,
                    message: "Full name must be at least 6 characters long",
                  },
                })}
              />
              {errors.fullname && (
                <span className="text-red-500 text-sm">
                  {errors.fullname.message}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500"
                }`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`w-full px-4 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500"
                }`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                onBlur={(e) => {
                  setPassword(e.target.value);
                  setInputFocusPassword(false);
                }}
                onMouseEnter={() => setInputFocusPassword(true)}
              />
              {inputFocusPassword && (
                <div
                  onClick={(e) => {
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute top-11 right-3 cursor-pointer w-7 h-7 text-black"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              )}
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative mb-4">
              <label
                htmlFor="cpassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="cpassword"
                className={`w-full px-4 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 ${
                  errors.cpassword
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500"
                }`}
                placeholder="Confirm your password"
                {...register("cpassword", {
                  required: "Password confirmation is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password confirmation must be at least 6 characters long",
                  },
                })}
                onBlur={(e) => {
                  setConfirmPassword(e.target.value);
                  setInputFocusCPassword(false);
                }}
                onMouseEnter={() => setInputFocusCPassword(true)}
              />
              {inputCFocusPassword && (
                <div
                  onClick={(e) => {
                    setShowConfirmPassword((prev) => !prev);
                  }}
                  className="absolute top-11 right-3 cursor-pointer w-7 h-7 text-black"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              )}
              {!passwordMatch && (
                <span className="text-red-500 text-sm">
                  Passwords do not match
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={!passwordMatch}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg"
            >
              Register
            </button>
          </form>
          <p className="text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
