import Navbar from "./components/navbar/Navbar"
import CreatePost from "./components/home/CreatePost";
import './App.css';
import Post from "./components/home/Post";
import { Route, Routes } from "react-router-dom"
import Register from "./components/register/Register"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Login/Register</h1>} />
      </Routes>

      <Routes>
        <Route element={<Navbar />}>
          {/* <Route index element={<CreatePost />} /> */}
          <Route path="/home" element={<CreatePost />}/>
          <Route path="/profiles" element={<Register />}/>
          <Route path="/about" element={<Register />}/>
        </Route>

        {/* Profile routes */}
        {/* <Route path="/profiles">
          <Route index element={<Profiles />} />
          <Route path=":id" element={<Profile />} />
        </Route> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
