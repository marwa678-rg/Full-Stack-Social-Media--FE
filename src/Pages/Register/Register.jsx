import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
//CSS
import"../../styles/auth.css";


export const Register = () => {
//States
const[showPass,setShowPass]=useState(false);
//refs

//handlers
async function handleSubmit(e){
  e.preventDefault();

}



  return (
<section className='auth-page'>
    <Container>
    <div className='auth-wrapper'>
    <Card className='auth-card'>
      <Card.Body>
        <h3 className='text-center fw-bold mb-2'>
          Create your account
        </h3>
        <p className='text-center text-muted mb-4'>
          Join and start sharing moments✨
        </p>
    </Card.Body>
<Form onSubmit={handleSubmit}>

  <Form.Group className="mb-3">
     
      <Form.Control
      type="email"
      name="email"
      placeholder="Email"
      required
      ></Form.Control>
    </Form.Group>




    <Form.Group className="mb-3">
      
      <Form.Control
      type="text"
      name="name"
      placeholder="Your name"
      required
      ></Form.Control>
    </Form.Group>


<InputGroup>
    <Form.Control
    type={showPass ? "text" :"password"}
    placeholder="password"
    required
    />
    <InputGroup.Text onClick={()=>{setShowPass(!showPass)}}
    style={{cursor:"pointer"}}
    >
    {showPass ? <FaEye /> : <FaEyeSlash />}    
    </InputGroup.Text>

</InputGroup>


<Button type="submit" className="w-100 auth-btn">
   Create Account
 </Button>

</Form>




</Card>


    </div>





    </Container>



</section>
  )
}
