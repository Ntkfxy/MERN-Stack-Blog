import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import AuthService from "../service/authentication.service";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, logIn } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ แจ้งเตือนหลังสมัครสมาชิกสำเร็จ
  useEffect(() => {
    if (location.state?.registered) {
      Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ 🎉",
        text: "กรุณาเข้าสู่ระบบ",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [location.state]);

  // 🔁 ถ้า login อยู่แล้ว ไม่ต้องเข้าหน้า login
  useEffect(() => {
    if (userInfo?.accessToken) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire("Error", "กรุณากรอกข้อมูลให้ครบ", "error");
      return;
    }

    try {
      const res = await AuthService.login(username, password);

      if (res.status === 200) {
        logIn({
          id: res.data.id,
          username: res.data.username,
          accessToken: res.data.accessToken,
        });

        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      }
    } catch (err) {
      Swal.fire(
        "Login failed",
        err?.response?.data?.message || "Username หรือ Password ไม่ถูกต้อง",
        "error"
      );
    }
  };

  return (
    // 🎯 จัดกึ่งกลางหน้าจอ
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        onSubmit={handleLogin}
        className="card w-full max-w-sm bg-base-100 shadow-xl"
      >
        <div className="card-body space-y-4">
          <h2 className="text-center text-2xl font-bold">
            Login 🔐
          </h2>

          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-success w-full">
            Login
          </button>

          <p className="text-center text-sm text-gray-500">
            ยังไม่มีบัญชี?
            <span
              className="ml-1 link link-primary"
              onClick={() => navigate("/register")}
            >
              สมัครสมาชิก
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
