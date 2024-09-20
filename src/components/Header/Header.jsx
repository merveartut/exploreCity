import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import { setTheme } from "../../context/slices/themeSlice";
import { MDBBtn } from "mdb-react-ui-kit";
import { setLoggedIn, setLoggedOut } from "../../context/slices/loginSlice";
import { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsPersonCircle } from "react-icons/bs";
function Header() {
  const theme = useSelector((state) => state.theme)
  const loggedIn = useSelector((state) => state.auth.loggedIn)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [openBasic, setOpenBasic] = useState(false)
  const handleLogOut = () => {
    dispatch(setLoggedOut())
    navigate("/login")
  }
  console.log("logggg", user)
  return (

    <Navbar expand="lg" className="bg-body-tertiary">
    <Container style={{minWidth:"100%", paddingInline:"12px"}}>
      <Navbar.Brand style={{textAlign:"center", justifyContent:"center"}} onClick={() => navigate("/")}>Wander</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        
  
          <Nav className="justify-content-end flex-grow-1 pe-3" style={{justifyContent:"end"}}>
          <NavDropdown
              align="end"
              title={<BsPersonCircle style={{ fontSize: "22px", cursor: "pointer" }} />}
              id="basic-nav-dropdown"
            >
            {loggedIn && <NavDropdown.Item onClick={() => handleLogOut()}>Logout</NavDropdown.Item>}
            {!loggedIn && <NavDropdown.Item onClick={() => navigate("/login")}>Login</NavDropdown.Item>}
            <NavDropdown.Item onClick={() => navigate(`/profile/${user.id}`)}>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;
