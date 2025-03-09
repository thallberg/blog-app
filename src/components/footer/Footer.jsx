import React from 'react'
import './FooterStyle.css'

export default function Footer() {
    return (
        <footer className='footer'>
            <div className="footer-content">
                <div className="footer-section about">
                    <h2 className='footer-title'>About Us</h2>
                    <p>Welcome to our blog! We share the latest news, trends, and stories that inspire and inform.</p>
                </div>

                <div className="footer-section contact">
                    <h2 className='footer-title'>Contact</h2>
                    <p>Email: contact@blog.com</p>
                    <p>Phone: +123 456 7890</p>
                    <p>Address: 123 Blog Street, Web City</p>
                </div>

                <div className="footer-section social">
                    <h2 className='footer-title'>Follow Us</h2>
                    <div className="footer-social">
                        <i className="footer-icon fa-brands fa-square-facebook"></i>
                        <i className="footer-icon fa-brands fa-square-twitter"></i>
                        <i className="footer-icon fa-brands fa-linkedin"></i>
                        <i className="footer-icon fa-brands fa-square-instagram"></i>
                        <i className="footer-icon fa-brands fa-square-pinterest"></i>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 BlogApp. All Rights Reserved.</p>
            </div>
        </footer>
    )
}
