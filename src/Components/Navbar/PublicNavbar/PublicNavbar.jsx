import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

//cssImport
import"./publicNavbar.css";
import { Link, useNavigate } from 'react-router-dom';
export const PublicNavbar = () => {
// Gettoken to check
const token = localStorage.getItem("token");
//navigate
const go = useNavigate();
//handleLogout
function handleLogout(){
  localStorage.removeItem("token");
  go("/login");
}





  return (
    <Navbar expand="lg" fixed="top" bg="transparent" variant="dark" className="py-3">
      <Container >
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className='fw-bold'>
       connecta.
        </Navbar.Brand>
        {/* Mobile Toggle */}
        <Navbar.Toggle area-controls="public-navbar"/>

        <Navbar.Collapse id="public-navbar"  className='justify-content-end'>
          <Nav>
            {!token && (
              <Button as={Link} to="/login"
              variant='outline-light'
              className='auth-btn nav-auth-btn'
              size="sm"
              >
                Login
              </Button>
            )}

            {token &&(
              <Button variant="outline-light"
               className='auth-btn nav-auth-btn'
              size="sm"
              onClick={handleLogout}

              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>




    </Navbar>
  )
}
