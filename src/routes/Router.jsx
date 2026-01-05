import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import PostDetail from "../pages/PostDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import MainLayout from "../components/MainLayout";
import PostByAuthor from "../pages/PostByAuthor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "post/:id", element: <PostDetail /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "create", element: <Create /> },
      { path: "edit/:id", element: <Edit /> },
      { path: "author/:id", element: <PostByAuthor /> },
    ],
  },
]);

export default router;
