import React, { useState, useEffect } from "react";
import "./home.css";
import penIcon from "./images/pen.svg";
import imageIcon from "./images/image.svg";
import { Outlet } from "react-router-dom";
import Post from "./Post";

export default function CreatePost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://interlinkr-api-4df8d4540ce2.herokuapp.com/postRoute");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <main className="homepage">
      <section className="create-post">
        <div className="box-1">
          <form className="form-container form-1" action="">
            <label htmlFor="content"></label>
            <input className="" type="text" id="content" name="content" placeholder="What's on your mind?" />
          </form>
        </div>

        <div className="box-2">
          <div className="upload-post">
            <img id="upload-post" src={penIcon} alt="pen-icon"></img>
            <p>Upload Post</p>
          </div>

          <div className="upload-image">
            <img id="upload-image" src={imageIcon} alt="img-icon"></img>
            <p>Upload Image</p>
          </div>
        </div>
      </section>

      <section className="posts">
        {posts.map((post) => (
          <Post key={post.id} item={post} />
        ))}
      </section>
    </main>
  );
}
