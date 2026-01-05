import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import postService from "../service/posts.service";
import Swal from "sweetalert2";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    _id: "",
    title: "",
    createdAt: "",
    author: {},
    content: "",
    cover: "",
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo")); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.getById(id);
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Post Detail",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    fetchPost();
  }, [id]);

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm">
      <figure>
        <img src={post.cover || "/default-cover.jpg"} alt={post.title} />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>

        <p>{post.createdAt}</p>

        <div className="author mb-2">
          By{" "}
          <span className="text-blue-500">
            @
            <a href={`/author/${post?.author?._id}`}>
              {post?.author?.username}
            </a>
          </span>
        </div>

        {userInfo?.id === post?.author?._id && (
          <div className="edit-row mb-4 text-center flex items-center justify-center gap-2">
            <a className="btn btn-warning" href={`/edit/${post?._id}`}>
              Edit
            </a>
            <a className="btn btn-error" href={`/delete/${post?._id}`}>
              Delete
            </a>
          </div>
        )}

        <div
          className="content text-grey-700"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        ></div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
