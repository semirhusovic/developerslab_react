import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <nav className="white">
    <div className="container">
    <div className="nav-wrapper">
      <Link to="/"><img className="logo" alt="logo" src="./developers-lab-logo-copy.png" /></Link>
      <ul className="right">
      <Link to="/add-post"><a className="waves-effect waves-light btn blue"><i className="material-icons right">add</i>Add post</a></Link>
      </ul>
    </div>
  </div>
  </nav>
    </div>
  )
}

export default NavBar
