import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [username, setUsername] = useState(() => {
    const storedUsername = localStorage.getItem('username');
    console.log('UserContext Stored username:', storedUsername);
    return storedUsername;
});

console.log('AuthProvider Token:', username);

useEffect(() => {
    if (username) {
        // axios.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('username', username);
    } else {
        // delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('username');
    }
}, [username]);


  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsername = () => useContext(UserContext);
