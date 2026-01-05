import React from "react";
import { Link } from "react-router-dom";
const Post = ({ title, file, author, createdAt, summary, _id, index = 0 }) => {
  const isEven = index % 2 === 0;
  return (
    <a
      href={`/post/${_id}`}
      className={`card card-side bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
      key={_id}
    >
      <figure className="md:1/2 flex items-center justify-center ">
        <img src={file} alt={title} className="w-64 h-full object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>

        <p className="line-clamp-2">{summary}</p>

        <div className="card-actions justify-between items-center">
          <div className="badge badge-primary badge-outline">
            {author?.username || "ไม่ทราบผู้เขียน"} · {createdAt}
          </div>
        </div>
      </div>
    </a>
  );
};
export default Post;
