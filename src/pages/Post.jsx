import { useParams } from "react-router-dom";
import newsData from "../db.json"; 

const Post = () => {
  const { id } = useParams(); 
  const postId = parseInt(id, 10);
  const post = newsData.news.find((item) => item.id === postId);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl">ไม่พบข่าวนี้</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
        {post.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 text-gray-500 text-sm md:text-base">
        <span>Author: <strong>{post.author}</strong></span>
        <span>Date: {post.date}</span>
        <span className="badge badge-primary">{post.category}</span>
      </div>

      {/* Image */}
      <div className="mb-6">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg md:prose-xl max-w-full text-gray-800">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
