import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import "./styles.css"
import { setTheme } from '../../context/slices/themeSlice';
import { MDBBtn } from "mdb-react-ui-kit";
import { setLoggedIn, setLoggedOut } from '../../context/slices/loginSlice';
import { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import { BsPersonCircle } from "react-icons/bs"
function Header() {
  const theme = useSelector((state)=> state.theme) 
  const loggedIn = useSelector((state) => state.loggedIn.value)
  const dispatch = useDispatch()
  const [openBasic, setOpenBasic] = useState(false);
  return (    
    <MDBNavbar expand='lg' style={{backgroundColor:"transparent"}}>
      <MDBContainer fluid style={{justifyContent:"center"}}>
        <Link className="navTitle" style={{marginLeft:"48%"}} to="/">
        <MDBNavbarBrand   className="navTitle" style={{marginLeft:"48%"}}>Wander</MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse style={{justifyContent:"end"}} navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link custom-dropdown-toggle' role='button' icon="user-circle">
             <BsPersonCircle style={{fontSize:"22px"}}/>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Action</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

           
          </MDBNavbarNav>

        
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header