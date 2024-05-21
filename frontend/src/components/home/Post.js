import React, { useState, useEffect } from 'react';
import axios from 'axios';
import upvoteFilled from "./images/arrow-up.svg";
import upvoteNonFilled from "./images/upvote-nonfilled.svg";
import comments from "./images/comments.svg";
import { useAuth } from '../context/AuthProvider';

export default function Post(props) {
    const { token } = useAuth();
    const [count, setCount] = useState(props.item.Likes ? props.item.Likes.length : 0);
    const [liked, setLiked] = useState(props.item.LikedByUser);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchLikesCount() {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://interlinkr-api-4df8d4540ce2.herokuapp.com/postRoute/${props.item.id}/like`,
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

    const handleVote = async () => {
        try {
            const response = await axios.post(
                'https://interlinkr-api-4df8d4540ce2.herokuapp.com/LikeRoute',
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <section className="post">
            <div className="user--info">
                <h2>{props.item.username}</h2>
                <p>Created at {formatDate(props.item.createdAt)}</p>
            </div>
            <div className="title">
                <p>{props.item.title}</p>
                <div className="content">
                    <p>{props.item.content}</p>
                </div>
            </div>
            <div className="reactions">
                <div className="upvote-downvote">
                    <button id="upvote" onClick={handleVote} disabled={loading}>
                        <img src={liked ? upvoteFilled : upvoteNonFilled} alt="upvote-button" />
                    </button>
                    <h3>{count}</h3>
                </div>
                <button className="comments-button">
                    <img src={comments} alt="comments-button" />
                    Comments
                </button>
            </div>
        </section>
    );
}
