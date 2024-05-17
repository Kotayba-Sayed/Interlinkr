import "./home.css"

import penIcon from "./images/pen.svg"
import imageIcon from "./images/image.svg"
import { Outlet } from "react-router-dom"
import Post from "./Post"

export default function CreatePost() {
    const sampleData = [
        {
          id: 1,  
          username: "Ash Ketchum",
          timeAgo: 2,
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          count: 15
        },
        {
          id: 2,
          username: "May",
          timeAgo: 5,
          content: "Starme is pretty cool.",
          count: 2
        },
      ]
    
      const posts = sampleData.map(post => {
        return (
          <Post 
            key={post.id}
            item={post}
          />
        )
      })

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
        
        <section className="posts">{posts}</section>
    </main>
  )
}
