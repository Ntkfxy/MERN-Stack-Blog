import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Register from "../pages/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }, {
    path: "/post/:id",
    element: <Post />,
  },{
    path: "/login",
    element: <Login/>,
  },{
    path: "/register",
    element: <Register/>,
  }


  
]);
export default router;