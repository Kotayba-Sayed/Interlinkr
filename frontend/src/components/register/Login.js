// Login.js
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios from '../api/axios';

const LOGIN_URL = 'usersRoute/login';

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/home';

    const userRef = useRef();
    const pwdRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );

            const token = response?.data?.token;
            setToken(token); // Set only the token

            setUser('');
            setPwd('');
            navigate(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response.');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username or password.');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized.');
            } else {
                setErrMsg('Login failed.');
            }
            pwdRef.current.focus(); // Focus on password input after error
        }
    };

    return (
        <div className="login--container">
            <section className="registration-section">
                <p
                    ref={errRef}
                    className={errMsg ? 'login-errmsg' : 'login-offscreen'}
                    aria-live="assertive">
                    {errMsg}
                </p>
                <div className="registration-links">
                    <Link to="/">
                        <div className="component-focus">
                            <button className="login-view">Sign In</button>
                        </div>
                    </Link>
                    <Link to="/register">
                        <div className="component-unfocus">
                            <button className="login-view">Sign Up</button>
                        </div>
                    </Link>
                </div>
                <h1 className="login-text">Log into your account</h1>

                <form onSubmit={handleSubmit} className="registration-form">
                    <label htmlFor="username" className="login-label">
                        Username
                    </label>
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
                    <label htmlFor="password" className="login-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        ref={pwdRef}
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </section>
        </div>
    );
};

export default Login;
