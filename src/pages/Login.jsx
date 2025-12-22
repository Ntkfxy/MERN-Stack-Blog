import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import AuthService from "../service/authentication.service";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!user.username || !user.password) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Username or Password cannot be empty!",
      });
      return;
    } else {
      const response = await AuthService.login(user.username, user.password);

      if (response?.status === 200) {
        Swal.fire({
          icon: "success",
          title: "สมัครสำเร็จ",
          text: response?.data?.message,
        }).then(() => {
          navigate("/");
        });
      }
    }
  };

  return (
    <div>
      <div className="card w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border border-purple-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">
          Login
        </h2>

        {/* Username */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-semibold text-purple-600">
              Username
            </span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-sm"
            value={user.username}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-semibold text-purple-600">
              Password
            </span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-sm"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="btn btn-primary w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg py-2 transition-transform transform hover:scale-105 shadow-md"
        >
          Login
        </button>

        {/* Optional: link to register */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
