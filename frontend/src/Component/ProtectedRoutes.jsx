import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoutes({children}) {

    const user = JSON.parse(localStorage.getItem('user'))
    const location = useLocation()
    const currentPath = location.pathname;
    const verifyUser =currentPath.split("/")[1]

    if(!user){ 
        return ( <Navigate to="/login" />)
    }else if(user !== verifyUser){
      return (<Navigate to="/login" /> )
    }
    
  return children
}

export default ProtectedRoutes