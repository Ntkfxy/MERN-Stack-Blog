import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import PostService from "../service/post.service";

const PostByAuthor = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getByAuthorId(id);

        if (response.status === 200) {
          // รองรับทั้งกรณี backend ส่ง author มาด้วย หรือฝังใน post
          const data = response.data;
          setPosts(data.posts || data);

          if (data.author) {
            setAuthor(data.author);
          } else if (data.length > 0) {
            setAuthor(data[0].author);
          }
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Author Info */}
      <header className="bg-base-100 border border-base-300 rounded-xl p-6">
        <h1 className="text-3xl font-bold text-base-content">
          {author?.username}
        </h1>
        <p className="text-sm text-base-content/60 mt-1">
          โพสต์ทั้งหมด {posts.length} รายการ
        </p>
      </header>

      {/* Post List */}
      {posts.length === 0 ? (
        <div className="text-center text-base-content/60 py-20">
          ยังไม่มีโพสต์จากผู้เขียนรายนี้
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="group block"
            >
              <article className="bg-base-100 border border-base-300 rounded-xl p-6 hover:shadow-md transition">
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition">
                    {post.title}
                  </h2>

                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {post.summary}
                  </p>

                  <div className="text-xs text-base-content/50">
                    {post.createAt}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostByAuthor;
