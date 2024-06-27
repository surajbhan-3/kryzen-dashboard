import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
export const AuthContext = createContext()


export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [uId, setuId] = useState(null);

    useEffect(() => {
        // Check if user data is available in localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedUserId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
    
        if (storedUser && storedUserId && token) {
          setUserName(storedUser);
          setuId(storedUserId);
        }
      }, []);

     
  

    return (
      <AuthContext.Provider value={{ userName, setUserName, uId, setuId }}>
        {children}
      </AuthContext.Provider>
    );
  }