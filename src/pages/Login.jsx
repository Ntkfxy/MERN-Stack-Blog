import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { username, password } = loginData;

    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "กรุณากรอก Username และ Password",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: `ยินดีต้อนรับ, ${username}!`,
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/"); 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="card w-full max-w-sm p-8 bg-white shadow-lg rounded-lg border border-purple-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Login
        </h2>

        <div className="form-control mb-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input input-bordered w-full pr-3 pl-3 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-sm"
            value={loginData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-control mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full pr-3 pl-3 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-sm"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="btn btn-primary w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-md transition-transform transform hover:scale-105 shadow-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
