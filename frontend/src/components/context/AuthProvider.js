import { createContext, useEffect, useState, useContext } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [token, setToken_] = useState(localStorage.getItem('token'));
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('token');
        // console.log('AuthProvider Stored Token:', storedToken);
        return storedToken;
    });

    console.log('AuthProvider Token:', token);

    useEffect(() => {
        if (token) {
            // axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem('token', token);
        } else {
            // delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
