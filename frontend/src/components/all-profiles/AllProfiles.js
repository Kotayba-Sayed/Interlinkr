import axios from "../api/axios";
import "./allProfiles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "../user/Profile";

function AllProfiles () {

    const [users, setUsers] = useState([]);

    const USERS_URL = "usersRoute/all";

    const fetchUsers = async () => {
        try {
            const response = await axios.get(USERS_URL);
            // console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    // Show all profiles, except for admin
    return (
        <>
        <div className="all-profiles-container">
            <h2 id="all-users-title">All Profiles</h2>
            <div className="all-users">
                  {users.map((user) => (
                        user.username !== 'admin' && (
                            <Link className="username-link" key={user.id} to={`${user.id}`}>
                                {user.username}
                            </Link>
                        )
                    ))}
            </div>
        </div>
        </>
    )
}

export default AllProfiles;