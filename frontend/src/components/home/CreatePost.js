import React, { useState, useEffect, useRef } from "react";
import "./home.css";
import penIcon from "./images/pen.svg";
import Post from "./Post";
import { useAuth } from '../context/AuthProvider';
import { useLocation } from 'react-router-dom';

export default function CreatePost() {
  const { token } = useAuth();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const previousPostsRef = useRef([]);

  // login successful message
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || '');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

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
        const reversedData = data.reverse(); 
        setPosts(reversedData);
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

  const cancelNewPost = (e) => {
    e.preventDefault();
    setTitle("");
    setContent("");
  };

  return (
    <main className="homepage">
      {message && <div className="alert">{message}</div>}
      <section className="create-post-container">
        <div className="box-1">
          <form className="create-new-post-form" onSubmit={handleSubmit}>
            <input
              className="new-post-title"
              type="text"
              id="Title"
              name="Title"
              placeholder="Title Your Post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="new-post-content"
              type="text"
              id="content"
              name="content"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="create-post-buttons">
              <button onClick={handleSubmit} className={title && content ? "upload-post-button" : "upload-post-button-hide"}>
                <img src={penIcon} alt="pen-icon" id="upload-post" />
                Upload Post
              </button>
              <button onClick={cancelNewPost} className={title && content ? "cancel-new-post" : "cancel-new-post-hide"}>
                Cancel
              </button>
            </div>
          </form>
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
