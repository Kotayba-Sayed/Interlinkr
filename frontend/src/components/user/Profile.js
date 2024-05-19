import "./profile.css";
import Post from "../home/Post";

function Profile () {

    const sampleData = [
        {
          id: 1,  
          username: "Ash Ketchum",
          timeAgo: 2,
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          count: 15
        },
        {
          id: 2,
          username: "Ash Ketchum",
          timeAgo: 5,
          content: "Starme is pretty cool.",
          count: 2
        },
      ];
    
      const posts = sampleData.map(post => {
        return (
          <Post 
            key={post.id}
            item={post}
          />
        )
      });

    return (
        <>
        <div className="user-profile-container">
            <div id="profile-style-container">
                <p id="profile-username">{sampleData[0].username}</p>

                <h2 id="profile-posts-title">Post History</h2>

                <div id="profile-post-container">
                    <section className="posts">{posts}</section>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;