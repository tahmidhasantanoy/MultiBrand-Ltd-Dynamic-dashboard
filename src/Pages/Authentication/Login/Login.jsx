/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import Glogo from "../../../../public/images/google.png";
import loginImage from "../../../../public/images/login.svg";
import Swal from "sweetalert2";
import { useLoginDynamicUserMutation } from "../../../Redux/api/authApi";
import { useDispatch } from "react-redux";
import { setEmail } from "../../../Redux/Features/Product/ProductsSlice"; // Import the setEmail action

const LoginPage = () => {
  const { loginUser, handleGoogleSignIn } = useContext(AuthContext);
  const [loginDynamicUser] = useLoginDynamicUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle google sign in later
  const loginWithGoogle = () => {
    handleGoogleSignIn()
      .then(async (res) => {
        console.log(res);
        const user = res?.user;
        const fullName = user?.displayName;
        const email = user?.email;

        const userData = {
          fullName: fullName,
          email: email,
          role: "user",
        };

        try {
          const responseFromServer = await loginDynamicUser(userData);
          console.log(responseFromServer);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {
    const { email, password } = data;

    try {
      loginUser(email, password)
        .then(async (res) => {
          const user = res.user;
          const email = user?.email;
          console.log(user);

          const userData = {
            email: email,
            password: password,
          };
          console.log(userData, "userData");

          const responseFromServer = await loginDynamicUser(userData);
          const accessToken = responseFromServer?.data?.accessToken;

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
          }

          dispatch(setEmail(email)); 

          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-lg p-8 w-full max-w-[1300px]">
        {/* Left Section - Image */}
        <div className="md:w-1/2 text-center mb-6 md:mb-0">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="mx-auto w-3/4 md:w-full max-w-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-6">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mt-2">
            Login in to continue accessing your account.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                className={`w-full px-4 py-2 border rounded-lg shadow-sm bg-white  focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
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
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full px-4 py-2 border rounded-lg shadow-sm bg-white  focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <p href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </p>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-1/2 text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-gray-600 text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/registration"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <div className="mt-16 pl-4">
            <div className="flex items-center">
              <p className="text-black font-semibold">
                Or login in with &nbsp;&nbsp;&nbsp;
              </p>
              <div className="flex items-center space-x-3">
                <button onClick={loginWithGoogle}>
                  <img className="w-8 h-8" src={Glogo} alt="Google icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
