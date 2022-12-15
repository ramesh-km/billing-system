import { createBrowserRouter } from "react-router-dom";
import CreateContact from "../components/CreateContact";
import CreateItem from "../components/CreateItem";
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
        path: "contacts",
        element: <Contacts />,
        
      },
      {
        path: "create-item",
        element: <CreateItem />,
      },
      {
        path: "create-contact",
        element: <CreateContact />,
      },
    ],
  },
]);

export default router;
