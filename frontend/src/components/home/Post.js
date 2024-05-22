import React, { useState, useEffect, useRef } from 'react';
import axios from '../api/axios';
import upvoteFilled from "./images/arrow-up.svg";
import upvoteNonFilled from "./images/upvote-nonfilled.svg";
import comments from "./images/comments.svg";
import { useAuth } from '../context/AuthProvider';
import Comments from './Comments';
import { Link } from 'react-router-dom';


export default function Post(props) {

    const POST_URL = `postRoute/${props.item.id}/like`;
    const LIKE_URL = `LikeRoute`;

    const { token } = useAuth();
    const [count, setCount] = useState(props.item.Likes ? props.item.Likes.length : 0);

    const [liked, setLiked] = useState(null);

    const [loading, setLoading] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState(false);


    useEffect(() => {
        async function fetchLikesCount() {
            setLoading(true);
            try {
                const response = await axios.get(POST_URL,
                    {
                        headers: { Authorization: token }
                    }
                );
                setCount(response.data.likesCount);
            } catch (error) {
                console.error('Error fetching likes count', error);
            }
            setLoading(false);
        }

        fetchLikesCount();
    }, [props.item.id, token]);


    const showComments = () => {
        if (!commentsVisible) {
            setCommentsVisible(true);
        } else {
            setCommentsVisible(false);
        }

    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const handleVote = async () => {
        try {
            const response = await axios.post(LIKE_URL,
                { PostId: props.item.id },
                {
                    headers: { Authorization: token }
                }
            );

            if (response.data.liked) {
                setCount(prevCount => prevCount + 1);
                setLiked(true);
            } else {
                setCount(prevCount => Math.max(0, prevCount - 1));
                setLiked(false);
            }
        } catch (error) {
            console.error('Error handling vote', error);
        }
    };

    return (
        <section className="post">
            <div className="title--user">

                <div className="title">
                    <p>{props.item.title}</p>
                </div>
                <div className="user--info">
                    <Link className="username-text" key={props.item.id} to={`profiles/${props.item.UserId}`}>
                        {props.item.username}
                    </Link>
                </div>

            </div>
            <p className='timeAgo'>Created {formatDate(props.item.createdAt)}</p>

            <div className="content">
                <p>{props.item.content}</p>
            </div>

            <div className="reactions">
                <div className="upvote-downvote">
                    <button id="upvote" onClick={handleVote} disabled={loading}>
                        <img src={upvoteNonFilled} alt="upvote-button" />
                    </button>
                    <h3>{count}</h3>
                </div>
                <button className="comments-button" onClick={showComments}>
                    <img className='comments--image' src={comments} alt="comments-button" />
                    Reply
                </button>
            </div>
            <div className='show-comments-container'>
                {commentsVisible && <Comments postId={props.item.id} />}
            </div>
        </section>
    );
}
