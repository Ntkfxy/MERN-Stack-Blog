import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  // ✅ ตรวจสอบสิทธิ์ผู้ใช้
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      if (!user || user.role !== "owner") {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "คุณไม่มีสิทธิ์สร้างโพสต์นี้",
        }).then(() => navigate("/"));
        return;
      }

      setCurrentUser(user);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถตรวจสอบข้อมูลผู้ใช้ได้",
      }).then(() => navigate("/"));
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // ✅ สร้างโพสต์
  const handleCreatePost = async () => {
    const isContentEmpty = content.replace(/<(.|\n)*?>/g, "").trim() === "";

    if (!title || !summary || isContentEmpty) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบ",
      });
      return;
    }

    const newPost = {
      title,
      summary,
      content,
      author: currentUser.username,
      date: new Date().toISOString(),
    };

    setIsSaving(true);

    try {
      const res = await fetch("http://localhost:3000/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error("ไม่สามารถบันทึกโพสต์ได้");

      Swal.fire({
        icon: "success",
        title: "โพสต์ถูกบันทึกแล้ว!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Loading ตอนเช็ค user
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center p-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create New Post</h2>

          <input
            type="text"
            className="input input-bordered mt-4"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            className="input input-bordered mt-4"
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <p className="mt-4 font-semibold">Content</p>

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "list",
              "bullet",
              "link",
              "image",
            ]}
            style={{ height: "300px", marginBottom: "2rem" }}
          />

          {/* ยังไม่ผูก backend อัปโหลดไฟล์ */}
          <input type="file" className="file-input file-input-bordered mt-4" />

          <button
            onClick={handleCreatePost}
            className="btn btn-primary w-full mt-6"
            disabled={isSaving}
          >
            {isSaving ? "กำลังบันทึก..." : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
