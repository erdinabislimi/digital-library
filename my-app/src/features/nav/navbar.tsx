import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../footer/logo.png';

function NavBar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const logoStyle = { height: '50px', marginRight: '10px' };

  const brandStyle = {
    marginLeft: 0,
    paddingLeft: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: 700,
    fontSize: '1.5rem',
    letterSpacing: '1px',
  };

  const navLinkStyle = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: 500,
    fontSize: '1rem',
    letterSpacing: '0.5px',
  };

  return (
    <Navbar fixed="top" bg="dark" variant="dark" style={{ padding: '0.2rem 1rem', minHeight: '40px' }}>
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Navbar.Brand as={Link} to="/home" className="me-auto" style={brandStyle}>
          <img src={logo} alt="MyLibrary Logo" style={logoStyle} />
          MY-LIBRARY
        </Navbar.Brand>
        <Nav className="justify-content-end">
          {role === "admin" ? (
            <Nav.Link as={Link} to="/dashboard" className="text-white" style={navLinkStyle}>
              Dashboard
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/profili" className="text-white" style={navLinkStyle}>
              Profile
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="#" onClick={handleLogout} className="text-white" style={navLinkStyle}>
            Log out
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
