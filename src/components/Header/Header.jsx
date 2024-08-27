import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../context/slices/themeSlice';
import { MDBBtn } from "mdb-react-ui-kit";
import { setLoggedIn, setLoggedOut } from '../../context/slices/loginSlice';
function Header() {
  const theme = useSelector((state)=> state.theme) 
  const loggedIn = useSelector((state) => state.loggedIn.value)
  const dispatch = useDispatch()
  return (
    <>
    <Navbar bg="light" data-bs-theme="light" style={{height:40}}>
      <Container>
        <Link className="navbar-brand" to="/">Home</Link>
        <Nav className="me-auto">
          <Link className='nav-link' to='/users'>Users</Link>
          {!loggedIn && <Link className='nav-link' to='/login'>Form</Link>}
          <Link className='nav-link' to='/themeSwitcher'>Theme</Link>
          <Link className='nav-link' to='/weather'>Weather</Link>
        </Nav>
         
      </Container>
      {loggedIn && <MDBBtn onClick={() => dispatch(setLoggedOut())} className="gradient-custom-5 p-2">LOGOUT</MDBBtn>}
    <button onClick={() => {dispatch(setTheme(theme === "light" ? "dark" : "light"))}}>CHANGE THEME</button>
    </Navbar>
    
  </>
  )
}

export default Header