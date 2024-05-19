import "./home.css"

import penIcon from "./images/pen.svg"
import imageIcon from "./images/image.svg"
import { Outlet } from "react-router-dom"
import Post from "./Post"
import axios from "../api/axios"
import { useEffect, useState } from "react"


export default function CreatePost() {
  const [posts, setPosts] = useState([])



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/postRoute');
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, [])


    
    
    const sampleData = [
        {
          id: 1,  
          username: "Ash Ketchum",
          createdAt: 2,
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          count: 15
        },
        {
          id: 2,
          username: "May",
          createdAt: 5,
          content: "Starme is pretty cool.",
          count: 2
        },
      ]

      // const posts = sampleData.map((post) => {
      //   return (<Post key={post.id} item={post} />)
      // })

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
          {/* {posts} */}
          {posts.map((post) => (
            <Post key={post.id} item={post} />
          ))}
        </section>
    </main>
  )
}
