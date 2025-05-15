import '../styles/Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <h1>EchoVault</h1>
        </div>

        <div className="navbar-right">
          <div> <Link to="/">Home</Link> </div>
          <div> <Link to="/about_us">About us</Link> </div>
          <div> <Link to="/contact_us">Contact us</Link> </div>
          <div> <Link to="/sign_up">Sign up</Link> </div>
        </div>
      </div>
    </>
  )
}

export default Navbar