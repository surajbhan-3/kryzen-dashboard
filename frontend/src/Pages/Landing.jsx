import { useNavigate } from 'react-router-dom'

function Landing() {
const navigate = useNavigate()
const handleClick=()=>{
       navigate("/login")
}
  return (
    <div >
  
  <div className="ribbon" id='rbn'>
  <button onClick={handleClick}><span id='sp-1'>Kryzen</span> <span id='sp-2'>Login</span></button>
  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
  </div>


    </div>
  )
}

export default Landing