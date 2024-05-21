import "./profile.css";
import Post from "../home/Post";
import axios from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";

import { useAuth } from "../context/AuthProvider";


function Profile() {

    const { token } = useAuth();
    // console.log("Profile token", token)

    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState("");
    const [id, setId] = useState("");


    const PROFILE_URL = "usersRoute/profile";
    const POSTS_URL = "postRoute";
    
    // let username;
    // let id;

    const fetchUser = async () => {
        try {
          const response = await axios.get(PROFILE_URL, {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: token,
            },
          });

          // username = response.data.username;
          setUsername(response.data.username);
          // id = response.data.id;
          setId(response.data.id);
          console.log(id)
          } catch (error) {
            console.error("Error fetching posts", error);
          }
        }

    const fetchPosts = async () => {
        try {
            const response = await axios.get(POSTS_URL);
            const dataPosts = response.data.filter(post => post.UserId === parseInt(id))
            setPosts(dataPosts);
            // console.log(dataPosts)
          } catch (error) {
            console.error("Error fetching posts", error);
          }
        }
    

    useEffect(() => {
        fetchPosts();
        fetchUser();
    }, [id, username]);

    return (
        <>
        <div className="user-profile-container">
            <div id="profile-style-container">
                <p id="profile-username">
                    {username}
                </p>


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