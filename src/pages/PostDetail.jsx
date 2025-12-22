import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import postService from "../service/posts.service";
import Swal from "sweetalert2";

const PostDetail = () => {
  const { _id } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.getById(_id);
        if (response.status === 200) {
          setPost(response.data);
        } else {
          Swal.fire({
            title: "Post Not Found",
            icon: "error",
            text: `No Post found with ID: ${_id}`,
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error fetching Post",
          icon: "error",
          text: error.message,
        });
      }
    };
    fetchPost();
  }, [_id]);

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm">
      <figure>
        <img src={post.cover} alt={post.title} />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>

        <p>{post.createAt}</p>
        <p>{post.author}</p>

        <div
          className="content text-grey-700"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
