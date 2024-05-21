import sendComment from "./images/send.png";
import { useEffect, useState } from 'react';
import axios from "../api/axios";
import "./comments.css";
import { useAuth } from '../context/AuthProvider';

const NEW_COMMENT_URL = "commentRoute/:postId";


export default function NewComment () {

    const [newComment, setNewComment] = useState("");
    const { token } = useAuth();

    /// GET ID OF THE POST THIS NEW COMMENT IS FOR
    const postId = 1;

    //// GET THE USERNAME OF THE LOGGED IN USER WHO IS COMMENTING
    const username = "me";


    const createNewComment = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post(NEW_COMMENT_URL,
                JSON.stringify({ postId, comment: newComment, username }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }
            );

            //////////// Is this necessary? //////////////////
            const token = response?.data?.token;

            setNewComment("");


        } catch (err) {
            console.error(err);
        }

    }


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
                    <button className={newComment==="" ? "new-comment-button-hide" : "new-comment-button"} type="submit">
                        <img src={sendComment} alt="upvote-button" className="send-comment-image" />
                    </button>
                </span>
            </form>
        </div>
        </>
    );

}
