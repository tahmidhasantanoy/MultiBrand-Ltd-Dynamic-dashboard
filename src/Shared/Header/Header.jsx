/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillSun } from "react-icons/ai";
import { BsFillMoonStarsFill } from "react-icons/bs";
// import Container from "../../Components/ui/Container";
import logo from "../../../public/images/logo.png";

const Header = () => {
  const [theme, setTheme] = useState("light");

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

  return (
    <div className="w-full bg-white dark:bg-black shadow-lg xl:px-10">
      <div className="py-2 border-zinc-700">
        {/* <Container> */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-center space-x-3">
            <img
              className="w-14 h-14 animate-pulse"
              src={logo}
              alt="brand logo"
            />
            <p className="text-3xl bg-gradient-to-r from-red-700 to-white bg-clip-text text-transparent font-semibold">
              MultiBrand{" "}
            </p>
          </div>
          <div className="flex justify-end items-center space-x-3">
            {/* <Search /> */}
            <ul className="flex space-x-3">
              <NavLink
                to={"/"}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "text-cyan-400 hover:text-cyan-600 border-b-2 border-red-500 transition-all duration-500"
                    : "text-black dark:text-pink-100 hover:text-orange-600 text-[16px]"
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/hotels"}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "text-black hover:text-cyan-600 border-b-2 border-red-500 transition-all duration-500"
                    : "text-black dark:text-pink-100 hover:text-orange-600 text-[16px]"
                }
              >
                Hotels
              </NavLink>
              <NavLink
                to={"/flights"}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "text-black hover:text-cyan-600 border-b-2 border-red-500 transition-all duration-500"
                    : "text-black dark:text-pink-100 hover:text-orange-600 text-[16px]"
                }
              >
                Flights
              </NavLink>
              <NavLink
                to={"/dashboard"}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "text-black hover:text-cyan-600 border-b-2 border-red-500 transition-all duration-500"
                    : "text-black dark:text-pink-100 hover:text-orange-600 text-[16px]"
                }
              >
                Dashboard
              </NavLink>
            </ul>
            <div className="flex justify-end space-x-3">
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
        {/* </Container> */}
      </div>
    </div>
  );
};

export default Header;
