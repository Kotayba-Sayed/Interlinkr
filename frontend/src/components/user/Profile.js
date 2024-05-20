import "./profile.css";
import Post from "../home/Post";
import axios from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";

import { useAuth } from "../context/AuthProvider";


function Profile() {

    const { token } = useAuth();
    
    // const storedToken = localStorage.getItem('token');
    // console.log("Profile storedToken", storedToken);

    console.log("Profile token", token)


    // let { profileId } = useParams();

    const [posts, setPosts] = useState([]);

    const PROFILE_URL = "usersRoute/profile";
    const POSTS_URL = "postRoute";
    
    let username;
    let id;

    // console.log(localStorage.getItem('token'));

    const fetchUser = async () => {
        try {
          const response = await axios.get(PROFILE_URL, {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: token,
            },
          });

          username = response.data.username;
          id = response.data.id;
          console.log("response", response.data)
          console.log("username", username);
          console.log("id", id);

          } catch (error) {
            console.error("Error fetching posts", error);
          }
        }

    const fetchPosts = async () => {
        try {
            const response = await axios.get(POSTS_URL);
            const dataPosts = response.data.filter(post => post.UserId === id)
            setPosts(dataPosts);
            console.log(dataPosts)
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