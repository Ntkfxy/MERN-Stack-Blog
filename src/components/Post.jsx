import React from "react";
import { Link } from "react-router-dom";

const Post = ({
  title,
  author,
  summary,
  cover,
  createdAt,
  _id,
  index = 0,
}) => {
  const isEven = index % 2 === 0;

  return (
    <Link to={`/post/${_id}`} className="block">
      <div
        className={`
          card lg:card-side bg-base-100
          border-2 border-base-300
          shadow-sm hover:shadow-md
          hover:border-primary transition-all
          ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}
        `}
      >
        {/* Image */}
        <figure className="lg:w-2/5 overflow-hidden">
          <img
            src={cover}
            alt={title}
            className="h-56 w-full object-cover"
          />
        </figure>

        {/* Content */}
        <div className="card-body gap-3">
          <h2 className="card-title text-xl font-bold text-base-content">
            {title}
          </h2>

          <p className="text-sm font-medium text-base-content/80">
            author: {author.username} •{" "}
            {new Date(createdAt).toLocaleDateString()}
          </p>

          <p className="text-base leading-relaxed text-base-content">
            {summary}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
