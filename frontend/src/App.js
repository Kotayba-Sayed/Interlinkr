import Navbar from "./components/navbar/Navbar"
import CreatePost from "./components/home/CreatePost";
import Login from "./components/register/Login"
import Register from "./components/register/Register";
import Profile from "./components/user/Profile";
import EditProfile from "./components/edit-profile/EditProfile";
import RequireAuth from "./components/routes/RequireAuth";
import AllProfiles from "./components/all-profiles/AllProfiles";
import About from "./components/about/About";
import Admin from "./components/admin/Admin";
import Layout from "./Layout";
import UserProfile from "./components/user/UserProfile";
import './App.css';
import { Route, Routes } from "react-router-dom";






function App() {
  console.log("App");

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />


        <Route element={<RequireAuth />}>
          <Route element={<Navbar />}>

            <Route path="/" element={<CreatePost />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/editProfile" element={<EditProfile />}/>

            <Route path="/profiles" element={<AllProfiles />}/>
            <Route path="profiles/:id" element={<UserProfile />}/>
            <Route path="/about" element={<About />}/>

          </Route>
          <Route path="/admin" element={<Admin />}/>

        </Route>
        

        </Route>
      </Routes>
    </>
  );
}

export default App;
