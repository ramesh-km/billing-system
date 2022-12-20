import { createBrowserRouter } from "react-router-dom";
import CreateCustomer from "../components/CreateCustomer";
import CreateItem from "../components/CreateItem";
import UpdateCustomer from "../components/UpdateCustomer";
import UpdateItem from "../components/UpdateItem";
import MainLayout from "../layouts/MainLayout";
import Customers from "../pages/Customers";
import ErrorPage from "../pages/ErrorPage";
import Items from "../pages/Items";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
]);

export default router;
