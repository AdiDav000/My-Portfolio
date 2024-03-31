import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css'
import user_pic from '../assets/user-pic.jpg'

const Header = () => {
  const navigate = useNavigate();
  const handleProfileClick=()=>{
    // await profilefetch
    navigate("/profile");
  }
  return (
    <>
    <div className="header"><h1>ChatterBox</h1>
            <div className="header-buttons">
            <NavLink className={(e)=>{return e.isActive? "navSelected":"navNotSelected"}} to="/"><button>Home</button></NavLink>
            <NavLink className={(e)=>{return e.isActive? "navSelected":"navNotSelected"}} to="/user"><button>Btn 2</button></NavLink>
            <NavLink className={(e)=>{return e.isActive? "navSelected":"navNotSelected"}} to="/login"><button>Btn 3</button></NavLink>
            <NavLink className={(e)=>{return e.isActive? "navSelected":"navNotSelected"}} to="/def"><button>Btn 4</button></NavLink>
            <div className='ProfileButton'><img src={user_pic} onClick={handleProfileClick}></img></div>
            </div>
        </div>
    </>
  )
}

export default Header