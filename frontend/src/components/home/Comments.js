import { useEffect, useState } from 'react';
import axios from "../api/axios";
import "./comments.css";
import NewComment from './CreateComment';

export default function Comments (postId) {

    const [comments, setComments] = useState([]);

    // does this ever get called?
    useEffect(() => {

        const getComments = async () => {
            try {
                const response = await axios.get(`commentRoute/${postId}`);
                setComments(response.data);
                console.log(comments)
            } catch (err) {
                console.log(err);
            }
        }

        getComments();

    }, []);

    const testComments = [
        {
            username: "commenter_1",
            updatedAt: "2 hours ago",
            theComment: "Yellow, green, blue, red"
        },
        {
            username: "me123",
            updatedAt: "1 day ago",
            theComment: "Yellow, green, blue, red, Yellow, green, blue, red, Yellow, green, blue, red, Yellow, green, blue, red, Yellow, green, blue, red, Yellow, green, blue, red"
        },
    ]

    ////////// DELETE updatedAt UNLESS WE COUNT HOW LONG AGO COMMENT WAS POSTED  /////////////////
    const allComments = comments.map((comment, index) => {
        return (
            <div className='one-comment-container' key={index}>
                <p className='commenter-username'>{comment.username}</p>
                <p className='comment-post-time'>{comment.updatedAt}</p>
                <p className='comment-content-text'>{comment.theComment}</p>
            </div>
        )
      });


    return (
        <>
        <div className="comments-container">
            {allComments}
            <NewComment />
        </div>
        </>
    );

}
