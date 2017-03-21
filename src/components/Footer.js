import React from 'react';
import { Link } from 'react-router';

const Footer = (props) => { // eslint-disable-line no-unused-vars
  return (
    <footer className="footer">
      <div className="container-fluid visible-md visible-lg">
        <ul className="list-unstyled col-md-4">
          <h5><b>Contact Us</b></h5>
          <li><p>Call us on (03)0000 0000</p></li>
          <li><p>15 Street Name, Suburb 0000, City, Australia</p></li>
        </ul>
        <ul className="list-unstyled col-md-4">
          <h5><b>Concept Law Firm</b></h5>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/practice-areas">Practice Areas</Link></li>
          <li><Link to="/staff">Our People</Link></li>
          <li><Link to="/careers">Careers</Link></li>
        </ul>
        <ul className="list-unstyled col-md-4">
          <h5><b>Other</b></h5>       
          <li><Link to="#">Section</Link></li>
          <li><Link to="#">Section</Link></li>
          <li><Link to="#">Section</Link></li>
        </ul>        
      </div>
      <div className="footer-bottom text-center">
        <ul className="list-inline">
          <li>Concept Law Firm &copy; 2017</li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service">Terms of Service</Link></li>
        </ul>      
      </div>
    </footer>  
  );
};

export default Footer;