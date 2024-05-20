import Navbar from "./components/navbar/Navbar"
import CreatePost from "./components/home/CreatePost";
import Login from "./components/register/Login"
import Register from "./components/register/Register";
import Profile from "./components/user/Profile";
import EditProfile from "./components/edit-profile/EditProfile";
import RequireAuth from "./components/routes/RequireAuth";
import Layout from "./Layout";
import './App.css';
import { Route, Routes } from "react-router-dom"






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

            <Route path="/profiles" element={<h1>Profiles</h1>}/>
            <Route path="/about" element={<h1>About</h1>}/>

          </Route>
        </Route>
        

        </Route>
      </Routes>
    </>
  );
}

export default App;
