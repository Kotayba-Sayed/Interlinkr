import axios from '../api/axios';
import '../register/register.css';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';

// validating password (must be 8-24 characters, must contain at least one of each: upper, lower, number, special character)
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const EDIT_URL = 'usersRoute/changepassword';

export default function EditProfile () {

    const { token } = useAuth();

    const userRef = useRef();
    const errRef = useRef();
    const confirmRef = useRef();

    // password field
    const [oldPwd, setOldPwd] = useState('');
    const [validOldPwd, setValidOldPwd] = useState(false);
    const [oldPwdFocus, setOldPwdFocus] = useState(false);

    // password field
    const [newPwd, setPwd] = useState('');
    const [validNewPwd, setValidPwd] = useState(false);
    const [newPwdFocus, setPwdFocus] = useState(false);

    // repeat new password field
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // messages, success
    const [errMsg, setErrMsg] = useState('');
    const [confirmMsg, setConfirmMsg] = useState('');
    const [success, setSuccess] = useState(false);



    useEffect (() => {
        userRef.current.focus();
    }, [])

    // use effect for password
    useEffect (() => {
        const result = PWD_REGEX.test(newPwd);

        console.log(result);
        console.log(newPwd);

        setValidPwd(result);

        // check that password was repeated right
        const match = newPwd === matchPwd;
        setValidMatch(match);

    }, [newPwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [oldPwd, newPwd, matchPwd])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordValid = PWD_REGEX.test(newPwd);

        if (!passwordValid) {
            setErrMsg("Invalid Entry");
            return
        }

        try {
            const response = await axios.put(EDIT_URL,
                JSON.stringify({ oldPassword: oldPwd, newPassword: newPwd }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    // withCredentials: false
                }
            );
            console.log(response.data);
            console.log(response.token);
            console.log(JSON.stringify(response));

            setConfirmMsg("Registered Succesfully.");
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else {
                setErrMsg('Setting the new password failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
        <div className="login--container">
    
            
            <section className="registration-section">
                <p ref={errRef} className={errMsg ? "login-errmsg" : "login-offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <p ref={confirmRef} className={confirmMsg ? "login-confirm-msg" : "login-offscreen"} aria-live="assertive">
                    {confirmMsg}
                </p>
    
                <h1 className="login-text">Change Password</h1>
    
                <form onSubmit={handleSubmit} className="registration-form">
                    <label htmlFor="password" className="login-label">
                        Current Password:
                    </label>
                    <input 
                        type="password"
                        id="old-password"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setOldPwd(e.target.value)}
                        required
                        aria-invalid={validOldPwd ? "false" : "true"}
                        aria-describedby="oldpasswordnote"
                        onFocus={() => setOldPwdFocus(true)}
                        onBlur={() => setOldPwdFocus(false)}
                        className="login-input"
                        />
    
                    <label htmlFor="password" className="login-label">
                        New Password:
                        <span className={validNewPwd ? "login-valid" : "hide-login"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validNewPwd || !newPwd ? "hide-login" : "login-invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validNewPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        className="login-input"
                        />
                    <p id="pwdnote" className={newPwdFocus && !validNewPwd ? "login-instructions" : "login-offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters required. <br/>
                        Must include: a lowercase and an uppercase letter, a number, and a special character. <br/>
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> 
                        <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percentage">%</span>
                    </p>
    
                    <label htmlFor="confirm-password" className="login-label">
                        Confirm Password:
                        <span className={validMatch && matchPwd ? "login-valid" : "hide-login"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPwd ? "hide-login" : "login-invalid"}>
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
                        className="login-input"
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "login-instructions" : "login-offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                    <button disabled={!validMatch ? true : false} className="login-button">
                        Confirm
                    </button>
                </form>
            </section>
            </div>
        </>
        )
}