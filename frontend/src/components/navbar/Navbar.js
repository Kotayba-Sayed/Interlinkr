import "./navbar.css"
import { Link, Outlet, useNavigate } from "react-router-dom"

import logoIcon from "./images/logo.svg"
import homeIcon from "./images/home.svg"
import usersIcon from "./images/users.svg"
import infoIcon from "./images/info.svg"
import profileIcon from "./images/profile.svg"
import logout from "./images/logout.svg"
import edit from "./images/edit.svg"
import adminIcon from "./images/administrator.svg"
import menuProfile from "./images/menu-profile.svg"
import { useAuth } from "../context/AuthProvider"
import { useUsername } from "../context/UserContext"


function Navbar() {
  const { setToken } = useAuth();
  const { setUsername } = useUsername();
  const { username } = useUsername();
  const navigate = useNavigate();


  const handleLogout = () => {
    setToken();
    setUsername();
    navigate("/", { replace: true });
  };

  return (
    <>
    <header>
      <nav className="navbar-main">
        <Link className="navbar-logo-link" to="/">
          <div className="logo-container">
              <img id='logo' src={logoIcon} alt='logo'></img>
              <h5 id='logo-text'>InterLinkr</h5>
          </div>
        </Link>

          <div className="icon-container">
              <Link className="navbar-link" to="/">
                <img id='home-logo' src={homeIcon} alt='home-view'></img>
              </Link>

              <Link className="navbar-link" to="/profiles">
                <img id='users-logo' src={usersIcon} alt='users-view'></img>
              </Link>

              <Link className="navbar-link" to="/about">
                <img id='info-logo' src={infoIcon} alt='info-view'></img>
              </Link>

              {username === 'admin' &&
                <Link className="navbar-link" to="/admin">
                  <img id='info-logo' src={adminIcon} alt='info-view'></img>
                </Link>
              }
                
          </div>

          <div className="profile-container">

            <div className="dropdown show">
              <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img id='profile-logo' src={profileIcon} alt="profile-menu" />
              </a>

              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                {/* <a className="dropdown-item" href="/profile"> */}

                <Link className="dropdown-item" to="/profile" >
                  <img src={menuProfile} alt="menu-profile" />
                  Profile
                </Link>
                <Link className="dropdown-item" to="/editProfile">
                  <img src={edit} alt="edit" />
                  Edit Profile
                </Link>
                <Link onClick={ handleLogout } className="dropdown-item" to="#">
                  <img src={logout} alt="logout" />
                  Logout
                </Link>
              </div>
            </div>
          </div>
      </nav>
    
    </header>
    <Outlet />
    </>
  )
}

export default Navbar