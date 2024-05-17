import "./register.css";
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';
import { Link } from "react-router-dom";

// this needs to match the route in the backend
const LOGIN_URL = '/login';


export default function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user, pwd}), // these should match the names in the backend
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });

            // emptying the input fields
            setUser('');
            setPwd('');
            setSuccess(true);
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
        <>
        <div className="login--container">

            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Home Page</a>
                    </p>
                </section>
            ) : (
                <section className="registration-section">
                    <p ref={errRef} className={errMsg ? "login-errmsg" : "login-offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <div className="registration-links">
                        <Link to="/">
                            <div class="component-focus">
                                <button className="login-view">Sign In</button>
                            </div>
                        </Link>
                        {/*Instead of having #, add a route link here*/}
                        <Link to="/register">
                            <div class="component-unfocus">
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
            )}
            </div>
        </>
    )
}
