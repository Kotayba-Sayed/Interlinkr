import "./register.css";
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// validating user input (must be 1-24 characters. Capital, lowercase, numbers, -, _ allowed.)
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,24}$/;

// validating password (must be 8-24 characters, must contain at least one of each: upper, lower, number, special character)
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register';


export default function Register() {

    const userRef = useRef();
    const errRef = useRef();

    // user field
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // password field
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // repeat password field
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // error message
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    // use effect hook (first time setting the focus when the component loads to the user field)
    useEffect (() => {
        userRef.current.focus();
    }, [])

    // use effect for user
    useEffect (() => {
        // validate user's input
        const result = USER_REGEX.test(user);

        console.log(result);
        console.log(user);

        // name is valid = true
        setValidName(result);
    }, [user])

    // use effect for password
    useEffect (() => {
        const result = PWD_REGEX.test(pwd);

        console.log(result);
        console.log(pwd);

        setValidPwd(result);

        // check that password was repeated right
        const match = pwd === matchPwd;
        setValidMatch(match);

    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if sign up button gets enabled with JS hack
        const usernameValid = USER_REGEX.test(user);
        const passwordValid = PWD_REGEX.test(pwd);

        if (!usernameValid || !passwordValid) {
            setErrMsg("Invalid Entry");
            return
        }

        try {
            // send user and pwd to backend with post
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));

            setSuccess(true);

            // clear input fields here (do we need to?)

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username taken');
            } else {
                setErrMsg('Registration failed');
            }
            errRef.current.focus();
        }

    }


    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <div className="links">
                <div class="component-unfocus">
                    <a href="#">Sign In</a>
                </div>
                {/*Instead of having #, add a route link here*/}
                <div class="component-focus">
                    <a href="#">Sign Up</a>
                </div>
            </div>
            <h1>Create a new account</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="usernote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="usernote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    1 to 24 characters required. <br/>
                    Must begin with a letter. <br/>
                    Allowed: letters, numbers, underscores, hyphens. <br/>
                </p>

                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters required. <br/>
                    Must include: a lowercase and an uppercase letter, a number, and a special character. <br/>
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> 
                    <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percentage">%</span>
                </p>

                <label htmlFor="confirm-password">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                    type="password"
                    id="confirm-password"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>
                <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                    Sign Up
                </button>
            </form>
        </section>
    )
}
