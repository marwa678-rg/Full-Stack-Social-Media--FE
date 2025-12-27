//Imports
import React from 'react'
import{Navbar as BNavbar, Button, Container, Nav} from"react-bootstrap";
import { Link } from 'react-router-dom';
import"./navbar.css";


export const Navbar = ({onLoginClick,onRegisterClick}) => {
  return (
 <BNavbar expand="md" className="custom-navbar">
  <Container>

    {/* Brand */}
<BNavbar.Brand as={Link} className='brand'>
  Social App
</BNavbar.Brand> 

<BNavbar.Toggle/>

<BNavbar.Collapse>
{/* left links */}
    <Nav className="me-auto">
        <Nav.Link as={Link} to="/" >Home</Nav.Link> 
    </Nav>


  {/*  right Buttons */}
        <div className='d-flex gap-2 align-items-center'>
          <Button
          className='btn-login'
          onClick={onLoginClick}
          >
            Login
          </Button>
        


          <Button
          className='btn-register'
          onClick={onRegisterClick}
          >
            Register
          </Button>
       
        </div>



</BNavbar.Collapse>

  </Container>





 </BNavbar>
  )
}
