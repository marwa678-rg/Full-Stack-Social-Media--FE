//Imports
import React from 'react'
import {  Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../store/slices/userSlice';
//cssImport
import"./publicNavbar.css";







export const PublicNavbar = () => {


const {isLoggedIn} = useSelector((state)=>state.user);
const dispatch = useDispatch();

//navigate
const go = useNavigate();
// handle page location
const {pathname} = useLocation();





//logout handler
function handleLogout(){
  //confirm before logout
  if(! window.confirm("Are you sure want to logout ?")) return;
  localStorage.removeItem("token");
  dispatch(clearUser())
  go("/login");
}





  return (
    <Navbar expand="lg" fixed="top"  variant="dark" className="public-navbar">
      <Container >
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className='fw-bold brand-logo'>
       connecta.
        </Navbar.Brand>
        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="public-navbar"/>

        <Navbar.Collapse id="public-navbar"  className='justify-content-end'>
          <Nav className='align-items-center gap-2'>
          {/*landing links  */}
{!isLoggedIn && pathname === "/" && (
  <>
    <Nav.Link href="#features" className="nav-link">
      Features
    </Nav.Link>

    <Nav.Link href="#community" className="nav-link">
      Community
    </Nav.Link>

      <button
    className="nav-cta"
    onClick={() => go("/register")}
  >
    Join Connecta
  </button>
  </>
)}




                      {/* user login  */}

            {isLoggedIn && pathname !== "/feed" && (
              
                <Nav.Link as={Link} to="/feed" className='nav-link'>
                  feed
                </Nav.Link>
                )}

              {isLoggedIn && pathname !== "/profile" &&(
                 <Nav.Link as={Link} to="/profile" className='nav-link'>
                  Profile
                </Nav.Link>
              )}
              {isLoggedIn && (
                <Nav.Link
                as="button"
                onClick={handleLogout}
                className='nav-link'
                >
                      Logout
                </Nav.Link>
              

              )}
            
          

                          {/* not login  */}
            {!isLoggedIn && pathname !== "/login"&& (
              
               <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
          
            )}





          </Nav>
        </Navbar.Collapse>
      </Container>




    </Navbar>
  )
}
