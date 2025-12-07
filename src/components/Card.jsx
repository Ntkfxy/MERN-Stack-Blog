import React from 'react'
import { Link } from "react-router-dom";
const Card = ({ id,title, content, image, date, category }) => {
  return (
    <div className="card card-side bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
      <figure>
        <img
          src={image}
          alt={title}
          className="w-48 h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>

        <p className="text-sm text-gray-500">{date}</p>

        <p className="line-clamp-2">{content}</p>

        <div className="card-actions justify-between items-center">
          <div className="badge badge-primary badge-outline">{category}</div>
          <Link to={`/post/${id}`} className="btn btn-sm btn-primary">อ่านเพิ่มเติม</Link>
        </div>
      </div>
    </div>
  );
};
export default Card;