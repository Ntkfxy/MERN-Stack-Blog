import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthService from "../service/authentication.service";

const Register = () => {
  const navigate = useNavigate();

  // state สำหรับฟอร์ม
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // เมื่อกด Register
  const handleRegister = async (e) => {
    e.preventDefault();

    // ตรวจสอบค่าว่าง
    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ครบ",
        text: "กรุณากรอก Username และ Password",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await AuthService.register(username, password);

      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ 🎉",
          text: "กรุณาเข้าสู่ระบบ",
          confirmButtonText: "ไปหน้า Login",
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Register failed",
        text: err?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // ⭐ container ให้อยู่กลางจอ
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <form
        onSubmit={handleRegister}
        className="card w-96 bg-base-100 shadow-xl"
      >
        <div className="card-body space-y-4">
          <h2 className="card-title justify-center text-2xl">
            Register
          </h2>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ปุ่ม Register */}
          <button
            type="submit"
            className={`btn btn-success w-full ${
              loading ? "btn-disabled" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* ลิงก์ไป Login */}
          <p className="text-center text-sm">
            มีบัญชีอยู่แล้ว?{" "}
            <span
              className="link link-primary cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
