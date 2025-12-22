import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/authentication.service";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    if (userInfo) {
      navigate("/register");
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!user.username || !user.password) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Username or Password cannot be empty!",
        });
        return;
      }

      const response = await AuthService.register(user.username, user.password);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "สมัครสำเร็จ",
          text: "",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "สมัครไม่สำเร็จ",
          text: response?.data?.message || "เกิดข้อผิดพลาดบางอย่าง",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <div className="card w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border border-purple-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">
          Register
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
          Register
        </button>

        {/* Optional: link to login */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
