import sendComment from "./images/send.png";
import { useEffect, useState } from 'react';
import axios from "../api/axios";
import "./comments.css";
import { useAuth } from '../context/AuthProvider';



export default function NewComment(props) {
    console.log(props.postId)
    const postId = props.postId;
    console.log(postId);
    const NEW_COMMENT_URL = `commentRoute/${postId}`;
    const [newComment, setNewComment] = useState("");
    const { token } = useAuth();


    const createNewComment = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                NEW_COMMENT_URL,
                { theComment: newComment },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            setNewComment('');

        } catch (err) {
            console.error(err);
        }
    };



    return (
        <>
            <div className="comment-container">
                <form onSubmit={createNewComment} className='new-comment-form'>
                    <span className='new-comment-span'>
                        <input
                            type="text"
                            id='new-comment'
                            placeholder='Add a comment...'
                            autoComplete='off'
                            onChange={(e) => setNewComment(e.target.value)}
                            value={newComment}
                            required
                            className='new-comment'
                        />
                        <button className={newComment === "" ? "new-comment-button-hide" : "new-comment-button"} type="submit">
                            <img src={sendComment} alt="upvote-button" className="send-comment-image" />
                        </button>
                    </span>
                </form>
            </div>
        </>
    );

}
