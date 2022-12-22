import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CreateCustomer from "../components/CreateCustomer";
import CreateItem from "../components/CreateItem";
import ForgotPassword from "../components/ForgotPassword";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import UpdateCustomer from "../components/UpdateCustomer";
import UpdateItem from "../components/UpdateItem";
import AuthProvider from "../contexts/AuthProvider";
import Customers from "../pages/Customers";
import ErrorPage from "../pages/ErrorPage";
import Items from "../pages/Items";
import { Outlet } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <AuthProvider>
      <Outlet />
    </AuthProvider>,
    children: [
      {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "items",
            element: <Items />,
          },
          {
            path: "create-item",
            element: <CreateItem />,
          },
          {
            path: "update-item/:id",
            element: <UpdateItem />,
          },
          {
            path: "customers",
            element: <Customers />,
          },
          {
            path: "create-customer",
            element: <CreateCustomer />,
          },
          {
            path: "update-customer/:id",
            element: <UpdateCustomer />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default router;
