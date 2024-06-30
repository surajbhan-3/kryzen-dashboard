import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";
function Navbar() {
  const location = useLocation()
  const currentPath = location.pathname;
  const verifyUser =currentPath.split("/")[1]
  return (
    <div className="main-nav">
         <div className="inner-nav">
          <div className="logo">
            <Link to={`/${verifyUser}/home`}> <h1>Kryzen</h1> </Link>
          </div>
          <div>
            
          </div>
         </div>
    </div>
  )
}

export default Navbar