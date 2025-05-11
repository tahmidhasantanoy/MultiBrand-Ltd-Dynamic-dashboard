/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillSun } from "react-icons/ai";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import logo from "../../../public/images/logo.png";

const Header = () => {
  const [theme, setTheme] = useState("light");

  // Simulate logged-in user (change to null to simulate logged out)
  const [user, setUser] = useState(null); // or { email: "tahmid@example.com" }

  const [showLoginMenu, setShowLoginMenu] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme) document.body.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const newTheme = savedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  const toggleLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  const handleLogout = () => {
    // Handle user logout (e.g., remove user from localStorage or state)
    setUser(null); // Log the user out
    setShowLoginMenu(false);
  };

  return (
    <div className="w-full bg-white dark:bg-black shadow-lg xl:px-10 relative">
      <div className="py-2 border-zinc-700">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-center space-x-3">
            <img
              className="w-14 h-14 animate-pulse"
              src={logo}
              alt="brand logo"
            />
            <p className="text-3xl bg-gradient-to-r from-red-700 to-white bg-clip-text text-transparent font-semibold">
              MultiBrand
            </p>
          </div>

          <div className="flex justify-end items-center space-x-4 relative">
            <ul className="flex space-x-3">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-400 hover:text-cyan-600 border-b-2 border-red-500 transition-all duration-500"
                    : "text-black dark:text-pink-100 hover:text-orange-600 text-[16px]"
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/hotels"}
                className={({ isActive }) =>
                  isActive
                    ? "text-black hover:text-cyan-600 border-b-2 border-red-500 transition-all duration-500"
                    : "text-black dark:text-pink-100 hover:text-orange-600 text-[16px]"
                }
              >
                Hotels
              </NavLink>
              <NavLink
                to={"/flights"}
                className={({ isActive }) =>
                  isActive
                    ? "text-black hover:text-cyan-600 border-b-2 border-red-500 transition-all duration-500"
                    : "text-black dark:text-pink-100 hover:text-orange-600 text-[16px]"
                }
              >
                Flights
              </NavLink>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  isActive
                    ? "text-black hover:text-cyan-600 border-b-2 border-red-500 transition-all duration-500"
                    : "text-black dark:text-pink-100 hover:text-orange-600 text-[16px]"
                }
              >
                Dashboard
              </NavLink>
            </ul>

            {/* User or Login Icon */}
            <div className="relative">
              {user?.email ? (
                <div className="relative">
                  <FaUserCircle
                    className="w-7 h-7 text-gray-600 dark:text-white cursor-pointer"
                    onClick={toggleLoginMenu}
                  />

                  {/* Dropdown Profile Menu */}
                  {showLoginMenu && (
                    <div className="absolute right-0 top-10 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-lg rounded-md px-4 py-2 z-50">
                      <p className="text-sm text-gray-700 dark:text-white mb-2">
                        Logged in as {user.email}
                      </p>
                      <button
                        className="block w-full text-left text-sm py-1 hover:text-cyan-500"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <FaRegUser
                  className="w-6 h-6 text-gray-600 dark:text-white cursor-pointer"
                  onClick={toggleLoginMenu}
                />
              )}

              {/* Dropdown login menu */}
              {showLoginMenu && !user?.email && (
                <div className="absolute right-0 top-10 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-lg rounded-md px-4 py-2 z-50">
                  <button className="dark:text-white block w-full text-left text-sm py-1 hover:text-cyan-500">
                    <Link to="/login">Login</Link>
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme}>
              {theme === "dark" ? (
                <AiFillSun className="text-pink-100 w-6 h-6 hover:text-cyan-500" />
              ) : (
                <BsFillMoonStarsFill className="text-black w-6 h-6 hover:text-orange-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
