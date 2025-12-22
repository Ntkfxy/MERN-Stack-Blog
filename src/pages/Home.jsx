import React, { useState, useEffect } from "react";
import Post from "../components/Post.jsx";
import postService from "../service/posts.service.js";
import Swal from "sweetalert2";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await postService.getAllPosts();
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Posts",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    getAllPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts.length > 0 &&
        posts.map((post, index) => <Post key={index} postDetail={post} />)}
      {posts.length === 0 && <h1> No Post </h1>}
    </div>
  );
};

export default Home;
