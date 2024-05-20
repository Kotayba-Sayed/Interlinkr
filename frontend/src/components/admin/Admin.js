import "./admin.css";


function Admin () {

    // need all data from all tables

    const usersData = [
        {
            id: 1,
            username: "ash_ketchum",
            password: "fj2fkAjkfl4fis9adhjfjlsdf",
            createdAt: "2023",
            updatedAt: "2024"
        },
        {
            id: 2,
            username: "hello_32",
            password: "fj2fkAjkfl4fis9adhjfjlsdf",
            createdAt: "2023",
            updatedAt: "2024"
        },
        {
            id: 3,
            username: "test123",
            password: "fj2fkAjkfl4fis9adhjfjlsdf",
            createdAt: "2023",
            updatedAt: "2024"
        }
    ];

    const postData = [
        {
            id: 1,
            title: "My car",
            content: "loem ipsumdfdnf",
            username: "Ash_ketchum",
            createdAt: 4,
            updatedAt: 7,
            userId: 55
        },
        {
            id: 2,
            title: "My cat",
            content: "loem ipsum fjkdl 55 dfdnf",
            username: "catlover",
            createdAt: "2011",
            updatedAt: "2011",
            userId: 54
        }
    ];

    const likesData = [
        {
            id: 1,
            createdAt: "2024-02-02",
            updatedAt: "2024-03-03",
            userId: 3,
            postId: 2
        }
      ];

    const commentData = [
        {
            id: 1,
            theComment: "nice!",
            username: "yolo",
            createdAt: "2023-03-16",
            updatedAt: "2024-08-05",
            postId: 5
        }
      ];

    const users = usersData.map((user, index) => {
        return (
            <tr className="admin-row" key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
                <td>
                    <button className="moderate-button">delete</button>
                    <button className="moderate-button">update</button>
                </td>
            </tr> 
        )
      });

      const posts = postData.map((post, index) => {
        return (
            <tr className="admin-row" key={index}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.username}</td>
                <td>{post.createdAt}</td>
                <td>{post.updatedAt}</td>
                <td>{post.userId}</td>
                <td>
                    <button className="moderate-button">delete</button>
                    <button className="moderate-button">update</button>
                </td>
            </tr>
        )
      });

      const likes = likesData.map((like, index) => {
        return (
            <tr className="admin-row" key={index}>
                <td>{like.id}</td>
                <td>{like.createdAt}</td>
                <td>{like.updatedAt}</td>
                <td>{like.userId}</td>
                <td>{like.postId}</td>
                <td className="moderate">
                    <button className="moderate-button">delete</button>
                    <button className="moderate-button">update</button>
                </td>
            </tr>
            
        )
      });

      const comments = commentData.map((comment, index) => {
        return (
            <tr className="admin-row" key={index}>
                <td>{comment.id}</td>
                <td>{comment.theComment}</td>
                <td>{comment.username}</td>
                <td>{comment.createdAt}</td>
                <td>{comment.updatedAt}</td>
                <td>{comment.postId}</td>
                <td>
                    <button className="moderate-button">delete</button>
                    <button className="moderate-button">update</button>
                </td>
            </tr>
        )
      });



    return (
        <>
        <div className="admin-container">
            <div id="admin-users-table">
                <div className="admin-title-container">
                    <h2 className="admin-table-title">Users</h2>
                    <button className="create-button">Create User</button>
                </div>
                <table className="admin-table" id="users-table">
                    <tr className="admin-header">
                        <th>id</th>
                        <th>username</th>
                        <th>password</th>
                        <th>createdAt</th>
                        <th>UpdatedAt</th>
                        <th>moderate</th>
                    </tr>
                    {users}
                </table>
            </div>

            <div id="admin-posts-table">
            <div className="admin-title-container">
                    <h2 className="admin-table-title">Posts</h2>
                    <button className="create-button">Create Post</button>
                </div>
                <table className="admin-table" id="posts-table">
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
                    {posts}
                </table>
            </div>

            <div id="admin-comments-table">
            <div className="admin-title-container">
                    <h2 className="admin-table-title">Comments</h2>
                    <button className="create-button" id="create-comment-button">Create Comment</button>
                </div>
                <table className="admin-table" id="comments-table">
                    <tr className="admin-header">
                        <th>id</th>
                        <th>theComment</th>
                        <th>username</th>
                        <th>createdAt</th>
                        <th>updatedAt</th>
                        <th>postId</th>
                        <th>moderate</th>
                    </tr>
                    {comments}
                </table>
            </div>

            <div id="admin-likes-table">
            <div className="admin-title-container">
                    <h2 className="admin-table-title">Likes</h2>
                    <button className="create-button">Create Like</button>
                </div>
                <table className="admin-table" id="likes-table">
                    <tr className="admin-header">
                        <th>id</th>
                        <th>createdAt</th>
                        <th>updatedAt</th>
                        <th>userId</th>
                        <th>postId</th>
                        <th>moderate</th>
                    </tr>
                    {likes}
                </table>
            </div>
        </div>
        </>
    )
}

export default Admin;