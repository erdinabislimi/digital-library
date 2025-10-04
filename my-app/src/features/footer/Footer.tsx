import React from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import logo from './logo.png';

// Cast icons to React functional components with proper SVG props
const EnvelopeIcon = FaEnvelope as React.FC<React.SVGProps<SVGSVGElement>>;
const PhoneIcon = FaPhone as React.FC<React.SVGProps<SVGSVGElement>>;
const MapMarkerIcon = FaMapMarkerAlt as React.FC<React.SVGProps<SVGSVGElement>>;
const FacebookIcon = FaFacebookF as React.FC<React.SVGProps<SVGSVGElement>>;
const TwitterIcon = FaTwitter as React.FC<React.SVGProps<SVGSVGElement>>;
const InstagramIcon = FaInstagram as React.FC<React.SVGProps<SVGSVGElement>>;
const LinkedinIcon = FaLinkedinIn as React.FC<React.SVGProps<SVGSVGElement>>;

function Footer() {

  const footerStyle: React.CSSProperties = {
    borderTop: '1px solid #ddd',
    background: 'linear-gradient(135deg, #981c5c 0%, #a8407a 100%)',
    color: '#fff',
    paddingTop: '20px',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginBottom: '1rem',
    textAlign: 'center',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '0.95rem',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    color: '#fff',
    marginRight: '1rem',
    transition: 'transform 0.3s ease',
  };

  // Smaller icons for contact info
  const contactIconStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    marginRight: '0.5rem',
  };

  const logoStyle: React.CSSProperties = {
    height: '120px', // Enlarged logo size
  };

  const socialLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    marginLeft: '10px',
    marginRight: '10px',
    transition: 'transform 0.3s ease',
  };

  return (
    <footer style={footerStyle}>
      <div className="container" style={containerStyle}>
        <div className="row align-items-center">
          {/* Logo Section on Left */}
          <div className="col-md-4 text-left mb-4 mb-md-0">
            <img 
              src={logo} 
              alt="MyLibrary Logo" 
              style={logoStyle} 
            />
          </div>
          {/* Contact Information in the Middle */}
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <h5 style={titleStyle}>Na kontaktoni</h5>
            <ul className="list-unstyled">
              <li style={textStyle}>
                <EnvelopeIcon style={contactIconStyle} /> MyLibrary@library.com
              </li>
              <li style={textStyle}>
                <PhoneIcon style={contactIconStyle} /> +38349900900
              </li>
              <li style={textStyle}>
                <MapMarkerIcon style={contactIconStyle} /> Lagjja Dardani, 10000 Prishtinë, Kosovë
              </li>
            </ul>
          </div>
          {/* Social Media Links on Right */}
          <div className="col-md-4 text-right">
            <h5 style={titleStyle}>Na ndiqni</h5>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <a href="#" style={socialLinkStyle}>
                <FacebookIcon style={iconStyle} />
              </a>
              <a href="#" style={socialLinkStyle}>
                <TwitterIcon style={iconStyle} />
              </a>
              <a href="#" style={socialLinkStyle}>
                <InstagramIcon style={iconStyle} />
              </a>
              <a href="#" style={socialLinkStyle}>
                <LinkedinIcon style={iconStyle} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <small>© {new Date().getFullYear()} MyLibrary. All rights reserved.</small>
      </div>
    </footer>
  );
}

export default Footer;
