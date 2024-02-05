import React from 'react'
import { Navbar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FormValues } from '../interface/Interfaces';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps{
  getName?:string;
}
const Header: React.FC<HeaderProps>= ({getName}) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("loginUser");
    navigate("/")
  }

  return (
    <Navbar className="notes-nav bg-body-tertiary justify-content-between align-items-center header-title">
      <Navbar.Brand href="#home">Notes App</Navbar.Brand>
      <div className='d-flex align-items-center gap-4'>
        <div className='user-name '>
          <h5>{getName} </h5>
        </div>
        <div className='delete-icon'>
          <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} />
        </div>
      </div>
    </Navbar>
  )
}

export default Header;