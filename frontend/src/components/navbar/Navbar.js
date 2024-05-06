import "./navbar.css"

import logoIcon from "./images/logo.svg"
import homeIcon from "./images/home.svg"
import usersIcon from "./images/users.svg"
import infoIcon from "./images/info.svg"
import profileIcon from "./images/profile.svg"

function Navbar() {
  return (
    <nav className="navbar navbar-light">
        <div className="logo-container">
            <img id='logo' src={logoIcon} alt='logo'></img>
            <h5 id='logo-text'>InterLinkr</h5>
        </div>

        <div className="icon-container">
            <img id='home-logo' src={homeIcon} alt='home-view'></img>
            <img id='users-logo' src={usersIcon} alt='users-view'></img>
            <img id='info-logo' src={infoIcon} alt='info-view'></img>
        </div>

        <div className="profile-container">
            <img id='profile-logo' src={profileIcon}alt="profile-menu" />
        </div>
    </nav>
  )
}

export default Navbar