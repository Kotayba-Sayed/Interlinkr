import { createContext, useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // const [auth, setAuth] = useState({});
    const [token, setToken_] = useState(localStorage.getItem('token'));


    const setToken = (newToken) => {
        setToken_(newToken);
    }

    useEffect(() => {   
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);

        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken
        }),
        [token]
    );
    

    // console.log("AuthProvider", auth);
    console.log("token", token );
    console.log("context", contextValue)
    
    return (
        <AuthContext.Provider value={ contextValue }>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthContext;