import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import postService from "../service/post.service.js";

const Create = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });

  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPostDetail((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleContentChange = (value) => {
    setPostDetail((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);

      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", postDetail.content);
      data.set("file", postDetail.file);

      const response = await postService.createPost(data);

      if (response.status === 200) {
        Swal.fire({
          title: "Create Post",
          text: "Create post successfully",
          icon: "success",
        }).then(() => navigate("/"));
      }
    } catch (error) {
      Swal.fire({
        title: "Create Post",
        icon: "error",
        text: error?.response?.data?.message || error.message,
      });
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
            value={postDetail.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="summary"
            className="input input-bordered mt-4"
            placeholder="Summary"
            value={postDetail.summary}
            onChange={handleChange}
          />

          <Editor
            value={postDetail.content}
            onChange={handleContentChange}
          />

          <input
            type="file"
            name="file"
            className="file-input file-input-bordered mt-4"
            onChange={handleChange}
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
