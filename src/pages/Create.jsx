import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import postService from "../service/post.service.js";
import { UserContext } from "../context/UserContext";

const Create = () => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setPostDetail((prev) => ({ ...prev, file: files[0] }));
    } else {
      setPostDetail((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContentChange = (value) => {
    setPostDetail((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async () => {
    if (isSaving) return;

    if (!userInfo) {
      Swal.fire({
        title: "Not Logged In",
        text: "Please log in to create a post",
        icon: "warning",
      });
      return;
    }

    try {
      setIsSaving(true);

      const data = new FormData();
      data.append("title", postDetail.title);
      data.append("summary", postDetail.summary);
      data.append("content", postDetail.content);
      if (postDetail.file) data.append("file", postDetail.file);
      data.append("authorId", userInfo._id || userInfo.id);

      const response = await postService.createPost(data);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Post Published",
          icon: "success",
        }).then(() => navigate("/"));
      }
    } catch (error) {
      Swal.fire({
        title: "Create Post Failed",
        icon: "error",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-base-100 border border-base-300 rounded-2xl">
        <div className="px-8 py-10 space-y-10">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-base-content">
              Write a new post
            </h1>
            <p className="text-base-content/70">
              Share your knowledge and ideas with others.
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
              value={postDetail.title}
              onChange={handleChange}
              placeholder="Post title"
              className="input input-bordered w-full bg-base-100 text-lg"
            />
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-base-content">
              Summary
            </label>
            <textarea
              name="summary"
              value={postDetail.summary}
              onChange={handleChange}
              placeholder="Brief description of your post"
              className="textarea textarea-bordered w-full bg-base-100 min-h-[120px]"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-base-content">
              Content
            </label>
            <div className="border border-base-300 rounded-xl overflow-hidden bg-base-100">
              <Editor
                value={postDetail.content}
                onChange={handleContentChange}
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
              name="file"
              accept="image/*"
              onChange={handleChange}
              className="file-input file-input-bordered w-full bg-base-100"
            />
          </div>

          <div className="divider" />

          {/* Actions */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="btn btn-primary px-10"
            >
              {isSaving ? "Saving..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
