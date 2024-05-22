import React, { useState, useEffect, useRef } from "react";
import "./home.css";
import penIcon from "./images/pen.svg";
import Post from "./Post";
import { useAuth } from '../context/AuthProvider';
import { useLocation } from 'react-router-dom';
import axios from '../api/axios';

export default function CreatePost() {
  const { token } = useAuth();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const previousPostsRef = useRef([]);

  // login successful message
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || '');

  const POST_URL = `postRoute`;

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
  }, [posts]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(POST_URL);
      const data = await response.data;
      // console.log(data)

      if (previousPostsRef.current.length !== data.length) {
        const reversedData = data.reverse(); 
        setPosts(reversedData);
        previousPostsRef.current = data;
        // console.log("previousPostsRef", previousPostsRef.current)
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Token before request:', token);
    try {
      const response = await axios.post(POST_URL,
        JSON.stringify({ title, content,
         }),
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
        }
      );

      const newPost = await response.data;
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
