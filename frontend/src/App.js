import Navbar from "./components/navbar/Navbar"
import CreatePost from "./components/home/CreatePost";
import './App.css';
import { Route, Routes } from "react-router-dom"
import Login from "./components/register/Login"
import Register from "./components/register/Register";
import Profile from "./components/user/Profile";
import EditProfile from "./components/edit-profile/EditProfile";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>

    {/* if authenticated */}
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/home" element={<CreatePost />}/>
          <Route path="/profiles" element={<h1>Profiles</h1>}/>
          <Route path="/about" element={<h1>About</h1>}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/editProfile" element={<EditProfile />}/>
        </Route>
      </Routes>

        {/* Profile routes */}
        {/* <Route path="/profiles">
          <Route index element={<Profiles />} />
          <Route path=":id" element={<Profile />} />
        </Route> */}
        {/* <Route path="*" element={<NotFound />} /> */}
    </>
  );
}

export default App;
