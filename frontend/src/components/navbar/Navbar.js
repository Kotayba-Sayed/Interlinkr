import "./navbar.css"
import { Link, Outlet } from "react-router-dom"

import logoIcon from "./images/logo.svg"
import homeIcon from "./images/home.svg"
import usersIcon from "./images/users.svg"
import infoIcon from "./images/info.svg"
import profileIcon from "./images/profile.svg"
import logout from "./images/logout.svg"
import edit from "./images/edit.svg"
import menuProfile from "./images/menu-profile.svg"

function Navbar() {
  return (
    <>
    <header>
      <nav className="navbar-main">
        <Link className="navbar-logo-link" to="/home">
          <div className="logo-container">
              <img id='logo' src={logoIcon} alt='logo'></img>
              <h5 id='logo-text'>InterLinkr</h5>
          </div>
        </Link>

          <div className="icon-container">
              <Link className="navbar-link" to="/home">
                <img id='home-logo' src={homeIcon} alt='home-view'></img>
              </Link>

              <Link className="navbar-link" to="/profiles">
                <img id='users-logo' src={usersIcon} alt='users-view'></img>
              </Link>

              <Link className="navbar-link" to="/about">
                <img id='info-logo' src={infoIcon} alt='info-view'></img>
              </Link>
                
          </div>

          <div className="profile-container">

            <div className="dropdown show">
              <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img id='profile-logo' src={profileIcon} alt="profile-menu" />
              </a>

              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" href="#">
                  <img src={menuProfile} alt="menu-profile" />
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  <img src={edit} alt="edit" />
                  Edit Profile
                </a>
                
                <a className="dropdown-item" href="#">
                  <img src={logout} alt="logout" />
                  Logout
                </a>
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