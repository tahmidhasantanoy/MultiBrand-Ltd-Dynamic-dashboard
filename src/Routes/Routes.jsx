import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Authentication/Login/Login";
import Registration from "../Pages/Authentication/Registration/Registration";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddUser from "../Pages/Dashboard/AddUser";
import ManageUser from "../Pages/Dashboard/ManageUser";
import EditUser from "../Pages/Dashboard/EditUser";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "manage-users/add-user",
        element: <AddUser />,
      },
      {
        path: "manage-users/manage-user",
        element: <ManageUser />,
      },
      {
        path: "manage-users/edit-user/:id",
        element: <EditUser />,
      },
    ],
  },
]);

export default router;
