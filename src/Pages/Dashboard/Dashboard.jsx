/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LiaPowerOffSolid } from "react-icons/lia";
import { RiHome3Line } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // For large/tab devices
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile devices
  const mobileMenuRef = useRef(null); // Reference for the mobile menu
  const [openUserDropdown, setOpenUserDropdown] = useState(false);

  // Close mobile menu if click outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutFromDashboard = () => {
    console.log("logoutfromdashboard");
  };

  return (
    <div className="flex h-screen">
      {/* Left Drawer - Visible on Large and Tab Devices */}
      <div
        className={`${
          isDrawerOpen ? "w-64" : "w-16"
        } hidden sm:block bg-white transition-all duration-300 h-full`}
      >
        {/* Drawer Content */}
        <div className="flex flex-row h-full">
          {/* First Section */}
          <div className=".flex-1 p-3 border-r border-gray-300 bg-gray-200 flex flex-col items-center justify-center mr-[2px] rounded-r-xl">
            <ul className="mt-4">
              <li className="py-2 px-1 hover:bg-gray-300 rounded-md flex items-center">
                <NavLink to={"/"} className="hover:bg-gray-300 rounded-md">
                  <RiHome3Line className="text-black w-4 h-4" />
                </NavLink>
              </li>
              <li
                onClick={handleLogoutFromDashboard}
                className="py-2 px-1 hover:bg-gray-300 rounded-md"
              >
                <LiaPowerOffSolid className="text-black w-4 h-4" />
              </li>
              <li className="py-2 px-1 hover:bg-gray-300 rounded-md">
                <RiHome3Line className="text-black w-4 h-4" />
              </li>
            </ul>
          </div>

          {/* Second Section */}
          <div className="flex-1 p-4 bg-gray-200 rounded-2xl m-2">
            <h3 className="font-semibold text-gray-700 text-center tracking-widest">
              Dashboard
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-black text-white rounded-md"
                      : "block py-2 px-4 hover:bg-gray-300 rounded-md"
                  }
                >
                  Dash Home
                </NavLink>
              </li>

              {/* Dropdown Menu */}
              <li>
                <button
                  onClick={() => setOpenUserDropdown(!openUserDropdown)}
                  className="w-full text-left py-2 px-4 hover:bg-gray-300 rounded-md"
                >
                  <div className="flex items-center space-x-1">
                    <p>User Module</p>
                    {openUserDropdown ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                {openUserDropdown && (
                  <ul className="ml-4 mt-2 space-y-2">
                    <li>
                      <NavLink
                        to="/dashboard/manage-users/add-user"
                        className={({ isActive }) =>
                          isActive
                            ? "block py-1 px-4 bg-blue-400 text-white rounded"
                            : "block py-1 px-4 hover:bg-gray-300 rounded"
                        }
                      >
                        Add User
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/manage-users/manage-user"
                        className={({ isActive }) =>
                          isActive
                            ? "block py-1 px-4 bg-blue-400 text-white rounded"
                            : "block py-1 px-4 hover:bg-gray-300 rounded"
                        }
                      >
                        Manage User
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/manage-users/remove-user"
                        className={({ isActive }) =>
                          isActive
                            ? "block py-1 px-4 bg-blue-400 text-white rounded"
                            : "block py-1 px-4 hover:bg-gray-300 rounded"
                        }
                      >
                        Remove User
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-6 overflow-y-auto h-full">
        <Outlet />
        {/* Repeated content */}
      </div>

      {/* Toggle Button for Mobile - Visible Only on Mobile */}
      <div className="fixed bottom-4 left-4 sm:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-black text-white p-3 rounded-full shadow-md hover:bg-black-600"
        >
          Menu
        </button>
      </div>

      {/* Mobile Menu - Slides in from the Left */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div
            ref={mobileMenuRef} // Add ref to the mobile menu container
            className="bg-white w-64 h-full shadow-lg p-4"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray hover:text-gray-700"
            >
              Close
            </button>
            <h3 className="font-bold text-lg mt-4">Menu</h3>
            <ul className="mt-4">
              <li className="py-2 px-4 hover:bg-gray-300 rounded-md">
                <NavLink to={"/"} onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li className="py-2 px-4 hover:bg-gray-300 rounded-md">
                Profile
              </li>
              <li className="py-2 px-4 hover:bg-gray-300 rounded-md">
                Settings
              </li>
              <li className="py-2 px-4 hover:bg-gray-300 rounded-md">Logout</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
