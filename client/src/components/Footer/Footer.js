import React from 'react';
import './Footer.css';

const Footer = () => {

  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          Alpha24 <span>Library</span>
        </h3>
        <p className="footer-links">
          <a href="/home">Home</a>·<a href="https://google.com">About</a>·
          <a href="https://google.com">FAQ</a>·
          <a href="https://google.com">Contact</a>
        </p>
        <p className="footer-company-name">All rights reserved. &copy; 2020</p>
      </div>
      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>30 Krastyo Rakovski Str.</span> Sofia, Bulgaria
          </p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p>+359 882 424 242 </p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">contact@a24.library.com</a>
          </p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About us</span>
          Alpha24 Library is a web project designed by Nadya Hrisimova &amp;
          Mayya Markova.
        </p>
        <div className="footer-icons">
          <a href="https://google.com">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://google.com">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://google.com">
            <i className="fa fa-linkedin"></i>
          </a>
          <a
            href="https://gitlab.com/Hrisimova/a24-library-system"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
