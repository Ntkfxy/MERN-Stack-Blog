import { useState } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import postService from "../service/posts.service.js";

const Create = () => {
  const [posts, setPosts] = useState({
    title: "",
    cover: "",
    summary: "",
    content: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosts((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await postService.createPost(posts);
      if (response.status === 200) {
        Swal.fire("เพิ่มโพสต์สำเร็จ", "Post added successfully", "success")
          .then(() => navigate("/"));

        setPosts({
          title: "",
          cover: "",
          content: "",
          summary: "",
        });
      }
    } catch (error) {
      Swal.fire(
        "เกิดข้อผิดพลาด",
        error.message || "Something went wrong!",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center p-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create New Post</h2>

          <input
            type="text"
            name="title"
            className="input input-bordered mt-4"
            placeholder="Title"
            value={posts.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="summary"
            className="input input-bordered mt-4"
            placeholder="Summary"
            value={posts.summary}
            onChange={handleChange}
          />

          <p className="mt-4 font-semibold">Content</p>

          <ReactQuill
            theme="snow"
            value={posts.content}
            onChange={(value) =>
              setPosts((prev) => ({ ...prev, content: value }))
            }
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
          <input
            type="file"
            className="file-input file-input-bordered mt-4"
            onChange={(e) =>
              setPosts((prev) => ({ ...prev, cover: e.target.files[0] }))
            }
          />

          <button
            onClick={handleSubmit}
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
