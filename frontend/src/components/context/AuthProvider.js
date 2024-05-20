import { createContext, useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem('token'));


    const setToken = (newToken) => {
        setToken_(newToken);
    }

    useEffect(() => {   
        if (token) {
            // axios.defaults.headers.common['Authorization'] = `${token.token}`;
            localStorage.setItem('token', token.token);

        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);


    
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthContext;