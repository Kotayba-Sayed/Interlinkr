import "./home.css"

import penIcon from "./images/pen.svg"
import imageIcon from "./images/image.svg"

export default function CreatePost() {
  return (
    <section className="create-post">
        <div className="box-1">
            <form className="form-container" action="">
                <div className="form-group form-1">
                    <label htmlFor="content"></label>
                    <input className="" type="text" id="content" name="content" placeholder="What's on your mind?" />
                </div>
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
  )
}
