import { useEffect, useState } from 'react';
import axios from "../api/axios";
import "./comments.css";
import NewComment from './CreateComment';

export default function Comments ({postId, username}) {

    const [comments, setComments] = useState([]);

    useEffect(() => {

        const getComments = async () => {
            try {
                const response = await axios.get(`commentRoute/${postId}`);
                setComments(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        getComments();

    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const allComments = comments.map((comment, index) => {
        return (
            <div className='one-comment-container' key={index}>
                <p className='commenter-username'>{comment.username}</p>
                <p className='comment-post-time'>Commented {formatDate(comment.createdAt)}</p>
                <p className='comment-content-text'>{comment.theComment}</p>
            </div>
        )
      });


    return (
        <>
        <div className="comments-container">
            {allComments}
            <NewComment postId={postId} username={username} />
        </div>
        </>
    );

}
