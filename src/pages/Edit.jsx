import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import postService from "../service/post.service.js";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState({
    title: "",
    file: "",
    summary: "",
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.getById(id);
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          Swal.fire("Post Not Found", `No post found with ID: ${id}`, "error");
        }
      } catch (error) {
        Swal.fire("Error fetching post", error.message, "error");
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosts((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postService.updatePost(id, posts);
      if (response.status === 200) {
        Swal.fire("Post Updated", "Successfully updated post.", "success")
          .then(() => navigate("/"));
      }
    } catch (error) {
      Swal.fire("Error updating post", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center p-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Edit Post</h2>

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

          <input
            type="file"
            className="file-input file-input-bordered mt-4"
            onChange={(e) =>
              setPosts((prev) => ({ ...prev, file: e.target.files[0] }))
            }
          />

          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-6"
          >
            Update Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
