import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NewPost from "../pages/Newpost";
import EditPost from "../pages/EditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App เป็น layout หลัก
    children: [
      { path: "/", element: <Home /> },
      { path: "/post/:id", element: <Post /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/newpost", element: <NewPost /> },
      { path: "/editpost/:id", element: <EditPost /> },
    ],
  },
]);

export default router;
