import "./home.css"
import upvoteFilled from "./images/arrow-up.svg"
import upvoteNonFilled from "./images/upvote-nonfilled.svg"
import downvoteNonFilled from "./images/arrow-down.svg"
import downvoteFilled from "./images/downvote-filled.svg"
import comments from "./images/comments.svg"
import { useState } from "react"


export default function Post(props) {
    // console.log(props.item)
    // console.log(props.item.username)

    // props.item.count = 10
    

    const user = true

    let [voted, setVoted] = useState(null)
    let [count, setCount] = useState(props.item.count)
    let [downvote, setDownvote] = useState(downvoteNonFilled)
    let [upvote, setUpvote] = useState(upvoteNonFilled)

    function openComments() {
        // console.log("Hovering over comments")
    }

    function handleUpvote() {
        if (voted === null) {
            setCount(count + 1)
            setVoted(true)
            setUpvote(upvoteFilled)
            
        }
        else if (voted === true) {
            setCount(count - 1)
            setVoted(null)
            setUpvote(upvoteNonFilled)
        }

        else if (voted === false) {
            setCount(count + 2)
            setVoted(true)
            setUpvote(upvoteFilled)
            setDownvote(downvoteNonFilled)
        }
    
    }

    function handleDownvote() {
        if (voted === null) {
            setCount(count - 1)
            setVoted(false)
            setDownvote(downvoteFilled)
        }
        else if (voted === false) {
            setCount(count + 1)
            setVoted(null)
            setDownvote(downvoteNonFilled)
        }
        else if (voted === true) {
            setCount(count - 2)
            setVoted(false)
            setUpvote(upvoteNonFilled)
            setDownvote(downvoteFilled)
        }

    }


    return (
    <section className="post">
        <div className="user--info">
            <h2>{props.item.username}</h2>
            {/* WARNING! Only set to hours */}
            <p>{props.item.createdAt} hours ago</p>
        </div>
        <div className="content">
            <p>{props.item.content}</p>
        </div>
        <div className="reactions">
            <div className="upvote-downvote">
                <button id="upvote" onClick={handleUpvote}>
                    <img src={upvote} alt="upvote-button" /> 
                </button>
                <h3>{count}</h3>
                <button id="downvote" onClick={handleDownvote}>
                    <img src={downvote} alt="downvote-button" />
                </button>
            </div>
            <button className="comments-button" onClick={openComments}>
                <img src={comments} alt="comments-button" />
                {/* No comments functionality */}
                Comments
            </button>
        </div>
    </section>
  )
}
