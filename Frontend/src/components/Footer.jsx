
import React from 'react';
import { FaGithub, FaLinkedin, FaBriefcase } from 'react-icons/fa'; // Assuming FontAwesome icons
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="footer-text">Created by <strong>Pratik Jadhav</strong></p>
        <div className="social-links">
          <a href="https://github.com/pratikjadhav6632" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/jadhavpratik-/" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://pratik-jadhav-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="social-icon" title="Portfolio">
            <FaBriefcase />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
