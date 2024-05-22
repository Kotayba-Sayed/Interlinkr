import "./admin.css";
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthProvider';
import { all } from "axios";

function Admin() {
    const { token } = useAuth();

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [editPostId, setEditPostId] = useState(null);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('usersRoute/all', {
                    headers: {
                        Authorization: token
                    }
                });
                setUsers(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        const getPosts = async () => {
            try {
                const response = await axios.get('postRoute', {
                    headers: {
                        Authorization: token
                    }
                });
                setPosts(response.data);
            } catch (err) {
                console.log(err);
            }
        };


        const getComments = async () => {
            try {
                const response = await axios.get(`commentRoute/}`, {
                    headers: {
                        Authorization: token
                    }
                });
                setComments(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        // const getAllComments = async () => {
        //     try {
        //         const allPostComments = [];
        //         for (const post of posts) {
        //             console.log(post)
        //             const postComments = await axios.get(`commentRoute/${post.id}`, {
        //                 headers: {
        //                     Authorization: token
        //                 }
        //             });
        //             allPostComments.push(...postComments.data);
        //         }
        //         console.log(comments)
        //         setComments(allPostComments);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // };




    


        
        // getAllComments();
        getUsers();
        getPosts();
        // getComments();

        
    }, [token]);

    useEffect(() => {
        const getAllComments = async () => {
            try {
                const allPostComments = [];
                for (const post of posts) {
                    const postComments = await axios.get(`commentRoute/${post.id}`, {
                        headers: {
                            Authorization: token
                        }
                    });
                    allPostComments.push(...postComments.data);
                }
                setComments(allPostComments);
            } catch (err) {
                console.log(err);
            }
        };

        if (posts.length > 0) {
            getAllComments();
        }
    }, [posts, token]);

    const handleDeletePost = async (id) => {
        try {
            const response = await axios.delete(`postRoute/${id}`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data);
            setPosts(posts.filter(post => post.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await axios.delete(`usersRoute/Delete/${id}`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.log(err);
        }
    }


    const handleDeleteComment = async (id) => {
        try {
            const response = await axios.delete(`commentRoute/${id}`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data);
            setComments(comments.filter(comment => comment.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (type, item) => {
        
        if (type === 'user') {
            setEditUserId(item.id);
        } else if (type === 'post') {
            setEditPostId(item.id);
        } else if (type === 'comment') {
            setEditCommentId(item.id);
        }
        setEditFormData(item);
    };

    const handleSave = async (type, id) => {

        try {
            let response;
            if (type === 'user') {
                response = await axios.put(`usersRoute/${id}`, editFormData, {
                    headers: {
                        Authorization: token
                    }
                });
                setUsers(users.map(user => user.id === id ? response.data : user));
                setEditUserId(null);
            } else if (type === 'post') {
                response = await axios.put(`postRoute/${id}`, editFormData, {
                    headers: {
                        "Authorization": token
                    }
                });
                setPosts(posts.map(post => post.id === id ? response.data : post));
                setEditPostId(null);
            } else if (type === 'comment') {
                response = await axios.put(`commentRoute/${id}`, editFormData, {
                    headers: {
                        Authorization: token
                    }
                });
                setComments(comments.map(comment => comment.id === id ? response.data : comment));
                setEditCommentId(null);
            }
            const editForm = document.querySelector('.editForm');
            if (editForm) {
                editForm.remove();
            } else {
                console.log('No edit form found');
            }
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancelEdit = () => {
        setEditUserId(null);
        setEditPostId(null);
        setEditCommentId(null);
        setEditFormData({});

        const editForm = document.querySelector('.editForm');
        if (editForm) {
            editForm.remove();
        } else {
            console.log('No edit form found');
        }
        console.log(editForm);


    

    };

    const renderEditForm = (type, item) => {
            return (
            <tr className="editForm" key={item.id}>
                <td>{item.id}</td>
                {type === 'post' && (
                    <>
                        <td>
                            <input 
                                type="text"
                                value={editFormData.title || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={editFormData.content || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
                            />
                        </td>
                        <td>{item.username}</td>
                    </>
                )}
                {type === 'user' && (
                    <>
                        <td>
                            <input
                                type="text"
                                value={editFormData.username || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                            />
                        </td>
                        <td>{item.password}</td>
                    </>
                )}
                {type === 'comment' && (
                    <>
                        <td>
                            <input
                                type="text"
                                value={editFormData.theComment || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, theComment: e.target.value })}
                            />
                        </td>
                    </>
                )}
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
                {type === 'post' && <td>{item.UserId}</td>}
                {type === 'comment' && <td>{item.postId}</td>}
                <td>
                    <button onClick={() => handleSave(type, item.id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </td>
            </tr>
        );
    
    };


    const allUsers = users.map((user, index) => (
        editUserId === user.id ? renderEditForm('user', user) :
        <tr className="admin-row" key={index}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>{user.createdAt}</td>
            <td>{user.updatedAt}</td>
            <td>
                <button className="moderate-button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </td>
        </tr>
    ));

    const allPosts = posts.map((post, index) => (
        editPostId === post.id ? renderEditForm('post', post) :
        <tr className="admin-row" key={index}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.content}</td>
            <td>{post.username}</td>
            <td>{post.createdAt}</td>
            <td>{post.updatedAt}</td>
            <td>{post.UserId}</td>
            <td>
                <button className="moderate-button" onClick={() => handleDeletePost(post.id)}>Delete</button>
                <button className="moderate-button" onClick={() => handleEdit('post', post)}>Update</button>
            </td>
        </tr>
    ));

    const allComments = comments.map((comment, index) => (
        editCommentId === comment.id ? renderEditForm('comment', comment) :
        <tr className="admin-row" key={index}>
            <td>{comment.id}</td>
            <td>{comment.theComment}</td>
            <td>{comment.username}</td>
            <td>{comment.createdAt}</td>
            <td>{comment.updatedAt}</td>
            <td>{comment.postId}</td>
            <td>
                <button className="moderate-button" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                <button className="moderate-button" onClick={() => handleEdit('comment', comment)}>Update</button>
            </td>
        </tr>
    ));
   
    return (
        <div className="admin-container">
            <div id="admin-users-table">
                <div className="admin-title-container">
                    <h2 className="admin-table-title">Users</h2>
                </div>
                <table className="admin-table" id="users-table">
                    <thead>
                        <tr className="admin-header">
                            <th>id</th>
                            <th>username</th>
                            <th>password</th>
                            <th>createdAt</th>
                            <th>UpdatedAt</th>
                            <th>moderate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers}
                    </tbody>
                </table>
            </div>

            <div id="admin-posts-table">
                <div className="admin-title-container">
                    <h2 className="admin-table-title">Posts</h2>
                </div>
                <table className="admin-table" id="posts-table">
                    <thead>
                        <tr className="admin-header">
                            <th>id</th>
                            <th>title</th>
                            <th>content</th>
                            <th>username</th>
                            <th>createdAt</th>
                            <th>updatedAt</th>
                            <th>userId</th>
                            <th>moderate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPosts}
                    </tbody>
                </table>
            </div>

            <div id="admin-comments-table">
                <div className="admin-title-container">
                    <h2 className="admin-table-title">Comments</h2>
                </div>
                <table className="admin-table" id="comments-table">
                    <thead>
                        <tr className="admin-header">
                            <th>id</th>
                            <th>theComment</th>
                            <th>username</th>
                            <th>createdAt</th>
                            <th>updatedAt</th>
                            <th>postId</th>
                            <th>moderate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allComments}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
