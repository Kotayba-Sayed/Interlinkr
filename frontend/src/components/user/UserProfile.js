import "./profile.css";
import Post from "../home/Post";
import axios from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";

import { useParams } from "react-router-dom";


function UserProfile() {

    let { id } = useParams();

    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState("");

    const POSTS_URL = "postRoute";
    const USERS_URL = "usersRoute/all"
    
    const fetchPosts = async () => {
        try {
            const response = await axios.get(POSTS_URL);
            const dataPosts = response.data.filter(post => post.UserId === parseInt(id))
            setPosts(dataPosts);
          } catch (error) {
            console.error("Error fetching posts", error);
          }
        }

    const fetchUser = async () => {
        try {
            const response = await axios.get(USERS_URL);
            const dataUser = response.data.filter(user => user.id === parseInt(id))
            setUsername(dataUser[0].username);
          } catch (error) {
            console.error("Error fetching posts", error);
          }
        }

        
    useEffect(() => {
        fetchPosts();
        fetchUser();
    }, []);
    

    return (
        <>
        <div className="user-profile-container">
            <div id="profile-style-container">
                <p id="profile-username">{username}</p>

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

export default UserProfile;