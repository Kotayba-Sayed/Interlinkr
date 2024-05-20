import React, { useState } from 'react';
import axios from 'axios';
import upvoteFilled from "./images/arrow-up.svg";
import upvoteNonFilled from "./images/upvote-nonfilled.svg";
import downvoteNonFilled from "./images/arrow-down.svg";
import downvoteFilled from "./images/downvote-filled.svg";
import comments from "./images/comments.svg";

export default function Post(props) {
    const [voted, setVoted] = useState(null);
    const [count, setCount] = useState(props.item.count);
    const [downvote, setDownvote] = useState(downvoteNonFilled);
    const [upvote, setUpvote] = useState(upvoteNonFilled);

    async function handleVote(vote) {
        try {
            const response = await axios.post('https://interlinkr-api-4df8d4540ce2.herokuapp.com/LikeRoute', { PostId: props.item.id });
            const { liked } = response.data;
            if (vote === 'up' && liked) {
                setCount(count + 1);
                setVoted(true);
                setUpvote(upvoteFilled);
                setDownvote(downvoteNonFilled);
            } else if (vote === 'down' && !liked) {
                setCount(count - 1);
                setVoted(false);
                setUpvote(upvoteNonFilled);
                setDownvote(downvoteFilled);
            } else if (vote === 'up' && !liked) {
                setCount(count + 1);
                setVoted(true);
                setUpvote(upvoteFilled);
                setDownvote(downvoteNonFilled);
            } else if (vote === 'down' && liked) {
                setCount(count - 1);
                setVoted(false);
                setUpvote(upvoteNonFilled);
                setDownvote(downvoteFilled);
            }
        } catch (error) {
            console.error('Error handling vote', error);
        }
    }

    return (
        <section className="post">
            <div className="user--info">
                <h2>{props.item.username}</h2>
                <p>{props.item.timeAgo} hours ago</p>
            </div>
            <div className="title">
                <p>{props.item.title}</p>
                <div className="content">
                    <p>{props.item.content}</p>
                </div>
            </div>
            <div className="reactions">
                <div className="upvote-downvote">
                    <button id="upvote" onClick={() => handleVote('up')}>
                        <img src={upvote} alt="upvote-button" />
                    </button>
                    <h3>{count}</h3>
                    <button id="downvote" onClick={() => handleVote('down')}>
                        <img src={downvote} alt="downvote-button" />
                    </button>
                </div>
                <button className="comments-button">
                    <img src={comments} alt="comments-button" />
                    Comments
                </button>
            </div>
        </section>
    );
}
