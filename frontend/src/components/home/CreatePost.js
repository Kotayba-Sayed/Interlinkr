import React, { useState, useEffect, useRef } from "react";
import "./home.css";
import penIcon from "./images/pen.svg";
import Post from "./Post";
import { useAuth } from '../context/AuthProvider';

export default function CreatePost() {
  const { token } = useAuth();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const previousPostsRef = useRef([]);

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

      if (previousPostsRef.current.length !== data.length) {
        setPosts(data);
        previousPostsRef.current = data;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Token before request:', token);
    try {
      const response = await fetch("https://interlinkr-api-4df8d4540ce2.herokuapp.com/postRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ title, content }),
      });
      console.log('Token after request:', token);

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();
      setPosts([...posts, newPost]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <main className="homepage">
      <section className="create-post">
        <div className="box-1">
          <form className="form-container form-1" onSubmit={handleSubmit}>
            <label htmlFor="title"></label>
            <input
              className=""
              type="text"
              id="Title"
              name="Title"
              placeholder="Title?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="content"></label>
            <input
              className=""
              type="text"
              id="content"
              name="content"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </form>
        </div>

        <div className="box-2">
          <div className="upload-post" onClick={handleSubmit}>
            <img id="upload-post" src={penIcon} alt="pen-icon"></img>
            <p>Upload Post</p>
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
