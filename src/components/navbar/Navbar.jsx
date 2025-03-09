import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavbarStyle.css';
import UserService from '../../services/Userservice.js';

export default function Navbar() {
    const [user, setUser] = useState(UserService.isAuth());
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const closeMenu = () => setClick(false);


    useEffect(() => {
        setUser(UserService.isAuth()); // Uppdatera när komponenten laddas
    }, []);

    const handleLogout = () => {
        UserService.logout();
        setUser(false); 
        window.location.href = "/login";
    };

    return (
        <nav className='navbar'>

            <div className="navbar-left">
                <i className="navbar-topicon fa-brands fa-square-facebook"></i>
                <i className="navbar-topicon fa-brands fa-square-twitter"></i>
                <i className="navbar-topicon fa-brands fa-square-pinterest"></i>
                <i className="navbar-topicon fa-brands fa-square-instagram"></i>
            </div>

            <div className="navbar-center">
                <ul className={click ? 'navbar-list active' : 'navbar-list'}>
                    <li className='navbar-listitem'>
                        <Link to="/" onClick={closeMenu} >HOME</Link>
                    </li>
                    <li className='navbar-listitem'>
                        <Link to="/about" onClick={closeMenu} >ABOUT</Link>
                    </li>
                    <li className='navbar-listitem'>
                        <Link to="/contact" onClick={closeMenu} >CONTACT</Link>
                    </li>
                 {    user && (
                    <li className='navbar-listitem'>
                        <Link to="/write" onClick={closeMenu} >WRITE</Link>
                    </li>
                   )}
                    {user && (
                        <li className='navbar-listitem' onClick={handleLogout} style={{ cursor: "pointer" }}>
                            LOGOUT
                        </li>
                    )}
                </ul>
                <div className="hamburger" onClick={handleClick}>
                    {click ? <i className="menuicon fa-solid fa-xmark "></i> : <i className="menuicon fa-solid fa-bars"></i>}
                </div>
            </div>
            
            <div className="navbar-right">
                {/* FA-CIRCLE-USER ICON - ALLTID SYNLIG */}
                <Link to={user ? "/settings" : "/login"}>
                    <i className="navbar-image fa-solid fa-circle-user"></i>
                </Link>

                <i className='navbar-searchitem fas fa-search'></i>
            </div>
        </nav>
    );
}
