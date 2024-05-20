import "./register.css";
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';

import axios from '../api/axios';   

// this needs to match the route in the backend
const LOGIN_URL = 'usersRoute/login';



const Login = () => {

    // console.log(localStorage)
    // const { setAuth } = useAuth();
    const { setToken } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/home';  // if there is no state, go to home
    // console.log("location", location) 

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(pwd, user)
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: pwd}), // these should match the names in the backend
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: false
                }
            );
            console.log(response);
            console.log(JSON.stringify(response?.data));

            const token = response?.data?.token;
            const roles = response?.data?.roles;
            // console.log(roles)
            setToken({ username: user, password: pwd, roles, token});

            // emptying the input fields
            setUser('');
            setPwd('');
            navigate(from, { replace: true })

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response.');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username or password.');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized.');
            } else {
                setErrMsg('Login failed.')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="login--container">
            <section className="registration-section">
                <p ref={errRef} className={errMsg ? "login-errmsg" : "login-offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <div className="registration-links">
                    <Link to="/">
                        <div className="component-focus">
                            <button className="login-view">Sign In</button>
                        </div>
                    </Link>
                    {/*Instead of having #, add a route link here*/}
                    <Link to="/register">
                        <div className="component-unfocus">
                            <button className="login-view">Sign Up</button>
                        </div>
                    </Link>
                </div>
                <h1 className="login-text">Log into your account</h1>

                <form onSubmit={handleSubmit} className="registration-form">
                    <label htmlFor="username" className="login-label">Username</label>
                    <input 
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        className="login-input"
                        />
                    <label htmlFor="password" className="login-label">Password</label>
                    <input 
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        className="login-input"
                        />
                    <button className="login-button">Login</button>
                </form>
            </section>
        </div>
    )
}


export default Login;