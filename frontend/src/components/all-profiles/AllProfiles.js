import "./allProfiles.css";
import { Link } from "react-router-dom";




function AllProfiles () {

    // from users table, get all usernames

    const sampleData = [
        {
          id: 1,  
          username: "Ash Ketchumfjek5dksjei3e",
          timeAgo: 2,
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          count: 15
        },
        {
          id: 2,
          username: "May_23",
          timeAgo: 5,
          content: "Starme is pretty cool.",
          count: 2
        },
        {
            id: 3,  
            username: "Ketchum88",
            timeAgo: 2,
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            count: 15
          },
          {
            id: 4,
            username: "hello 5",
            timeAgo: 5,
            content: "Starme is pretty cool.",
            count: 2
          },
          {
            id: 5,  
            username: "Ash99",
            timeAgo: 2,
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            count: 15
          },
          {
            id: 6,
            username: "907he",
            timeAgo: 5,
            content: "Starme is pretty cool.",
            count: 2
          },
          {
              id: 7,  
              username: "lol3",
              timeAgo: 2,
              content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
              count: 15
            },
            {
              id: 8,
              username: "no_one",
              timeAgo: 5,
              content: "Starme is pretty cool.",
              count: 2
            },
      ];
    
      const users = sampleData.map((user, index) => {
        // the Link tag should connect to="/profile/:id" to view that user's account
        return (
            <Link className="username-link" key={index} to="#">{user.username}</Link>
        )
      });

    return (
        <>
        <div className="all-profiles-container">
            <h2 id="all-users-title">All Profiles</h2>
            <div className="all-users">
                {users}
            </div>
        </div>
        </>
    )
}

export default AllProfiles;