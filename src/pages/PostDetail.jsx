import { useState, useEffect, useContext } from "react";
import DOMPurify from "dompurify";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PostService from "../service/post.service";
import { UserContext } from "../context/UserContext";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  const [post, setPost] = useState({
    _id: "",
    title: "",
    cover: "",
    createAt: "",
    author: {},
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "ต้องการลบโพสต์นี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        const response = await PostService.deletePost(post._id);
        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            text: "ลบโพสต์เรียบร้อยแล้ว",
          });
          navigate("/");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    }
  };

  const isOwner =
    userInfo?._id === post?.author?._id ||
    userInfo?.id === post?.author?._id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm">
        {/* Cover */}
        {post.cover && (
          <figure className="max-h-[420px] overflow-hidden">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </figure>
        )}

        <div className="px-6 md:px-10 py-10 space-y-10">
          {/* Header */}
          <header className="space-y-4 border-b border-base-300 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold leading-snug text-base-content">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/60">
              <span>{post.createAt}</span>
              <span className="opacity-40">•</span>
              <Link
                to={`/author/${post?.author?._id}`}
                className="font-medium text-primary hover:underline"
              >
                {post?.author?.username}
              </Link>
            </div>
          </header>

          {/* Content */}
          <section
            className="prose prose-base md:prose-lg max-w-none
                       prose-headings:text-base-content
                       prose-p:text-base-content/90
                       prose-strong:text-base-content
                       prose-a:text-primary
                       prose-a:no-underline hover:prose-a:underline
                       leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />

          {/* Actions */}
          {isOwner && (
            <footer className="pt-6 border-t border-base-300 flex gap-3">
              <Link
                to={`/edit/${id}`}
                className="btn btn-sm btn-outline btn-warning"
              >
                แก้ไข
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-sm btn-outline btn-error"
              >
                ลบ
              </button>
            </footer>
          )}
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
