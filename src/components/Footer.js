import React from 'react';

const Footer = (props) => {
  return (
    <footer className="footer text-center">
      <div className="container">
        <ul className="list-inline">
          <li className="text-muted">Concept Law Firm &copy; 2017</li>
          <li><Link to="#">Contact</Link></li>
          <li><Link to="#">Privacy Policy</Link></li>
          <li><Link to="#">Terms of Service</Link></li>
        </ul>
      </div>
    </footer>  
  )
};

export default Footer;