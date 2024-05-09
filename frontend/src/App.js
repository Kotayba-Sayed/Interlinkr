import Navbar from "./components/navbar/Navbar"
import CreatePost from "./components/home/CreatePost";
import './App.css';
import Register from "./components/register/Register";
import Login from "./components/register/Login";


function App() {
  return (
    <div className="App">
      {/* <Navbar />
      <CreatePost /> */}
      <Login />
      <Register />

    </div>
  );
}

export default App;
