import { useEffect, useState } from 'react';
import axios from "../api/axios";
import "./comments.css";
import NewComment from './CreateComment';

export default function Comments () {

    const [comments, setComments] = useState([]);

    // how to get the post id of the post that the comments are attached to?

    useEffect(() => {

        const getComments = async () => {
            try {
                const response = await axios.get('commentRoute/:postId');
                setComments(response.data);
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
    const allComments = testComments.map((comment, index) => {
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
