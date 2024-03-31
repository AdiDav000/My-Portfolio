import React from 'react'
import { NavLink } from 'react-router-dom';
import './header.css'

const Header = () => {
  return (
    <>
    <div className="header"><h1>ChatterBox</h1>
            <div className="header-buttons">
            <NavLink className={(e)=>{return e.isActive? "navSelected":"navNotSelected"}} to="/"><button>Home</button></NavLink>
            <NavLink className={(e)=>{return e.isActive? "navSelected":"navNotSelected"}} to="/user"><button>Btn 2</button></NavLink>
            <NavLink className={(e)=>{return e.isActive? "navSelected":"navNotSelected"}} to="/abc"><button>Btn 3</button></NavLink>
            <NavLink className={(e)=>{return e.isActive? "navSelected":"navNotSelected"}} to="/def"><button>Btn 4</button></NavLink>
            </div>
        </div>
    </>
  )
}

export default Header