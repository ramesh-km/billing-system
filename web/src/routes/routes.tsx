import { createBrowserRouter } from "react-router-dom";
import CreateContact from "../components/CreateContact";
import CreateItem from "../components/CreateItem";
import UpdateContact from "../components/UpdateContact";
import UpdateItem from "../components/UpdateItem";
import MainLayout from "../layouts/MainLayout";
import Contacts from "../pages/Contacts";
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
        path: "update-item",
        element: <UpdateItem />,
      },
      {
        path: "contacts",
        element: <Contacts />,
        
      },
      {
        path: "create-contact",
        element: <CreateContact />,
      },
      {
        path: "update-contact",
        element: <UpdateContact />,
      },
    ],
  },
]);

export default router;
