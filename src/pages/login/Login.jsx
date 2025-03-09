import React from 'react'
import './LoginStyle.css'
import { Link } from 'react-router-dom'
import accountImg from '../../assets/login/account.webp';
import UserService from '../../services/UserService';

export default function Login() {

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    if (UserService.login(username, password)) {
        window.location.href = "/"; 
    } else {
        alert("Fel användarnamn eller lösenord!");
    }
};

  return (
    <div className='login'
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${accountImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
      <span className='logintitle'>Login</span>
      <form className='loginform' onSubmit={handleLogin}>
        <label>Email</label>
        <input type="text" className='logininput' placeholder='Enter your email' />
        <label>Password</label>
        <input type="Password" className='logininput' placeholder='Enter your password' />
        <button type='submit' className="loginbtn">Login</button>
      </form>
      <button className="loginregisterbtn">
        <Link to="/register" >Register</Link>
      </button>
    </div>
  )
}
