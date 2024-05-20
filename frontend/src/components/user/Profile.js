import "./profile.css";
import Post from "../home/Post";
import axios from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";

import { useAuth } from "../context/AuthProvider";


function Profile() {

    const { token } = useAuth();
    // let { profileId } = useParams();

    const [posts, setPosts] = useState([]);

    const POSTS_URL = "usersRoute/profile";

    const fetchPosts = async () => {
        try {
          const response = await axios.get(POSTS_URL, {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `${token.token}`,
            },
          });
          console.log(response.data);
          } catch (error) {
            console.error("Error fetching posts", error);
          }
        }
    

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
        <div className="user-profile-container">
            <div id="profile-style-container">
                <p id="profile-username">{token.username}</p>

                <h2 id="profile-posts-title">Post History</h2>

                <div id="profile-post-container">
                    <section className="posts">
                      {posts.map((post) => (
                        <Post key={post.id} item={post}/>
                      ))}
                    </section>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;