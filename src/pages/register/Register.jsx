import React from 'react'

import './RegisterStyle.css'
import { Link } from 'react-router-dom'
import accountImg from '../../assets/login/register.webp';
import UserService from '../../services/Userservice';

export default function Register() {
const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    UserService.register(username, password);
    alert("Registrering lyckades! Logga in nu.");
    navigate("/login");
};


  return (
    <div className='Register'
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${accountImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
      <span className='Registertitle'>Register</span>
      <form className='Registerform' onSubmit={handleRegister}>
        <label>Username</label>
        <input type="text"
          className='Registerinput'
          placeholder='Enter your username'
        />
        <label>Password</label>
        <input type="Password" className='Registerinput' placeholder='Enter your password' />
        <button type='submit' className="Registerbtn">Register</button>
      </form>
      <button className="registerloginbtn">
      <Link to="/login" >Login</Link>
      </button>
    </div>
  )
}
