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
    summary: "",
    content: "",
    file: null,
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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-base-100 border border-base-300 rounded-2xl">
        <div className="px-8 py-10 space-y-10">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-base-content">
              Edit Post
            </h1>
            <p className="text-base-content/70">
              Update your article content and details.
            </p>
          </div>

          <div className="divider" />

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-base-content">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={posts.title}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100 text-lg"
              placeholder="Post title"
            />
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-base-content">
              Summary
            </label>
            <textarea
              name="summary"
              value={posts.summary}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-base-100 min-h-[120px]"
              placeholder="Brief description of the post"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-base-content">
              Content
            </label>
            <div className="border border-base-300 rounded-xl overflow-hidden bg-base-100">
              <ReactQuill
                theme="snow"
                value={posts.content}
                onChange={(value) =>
                  setPosts((prev) => ({ ...prev, content: value }))
                }
                style={{ height: "320px" }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-base-content">
              Cover Image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full bg-base-100"
              onChange={(e) =>
                setPosts((prev) => ({ ...prev, file: e.target.files[0] }))
              }
            />
          </div>

          <div className="divider" />

          {/* Actions */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="btn btn-primary px-10"
            >
              Update Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
