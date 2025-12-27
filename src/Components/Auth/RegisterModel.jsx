
//Imports
import React, { useRef, useState } from 'react'
import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import { FaEyeSlash ,FaEye} from "react-icons/fa";
//CSS Imports
import"./auth.css";



export default function RegisterModel({onClose}) {
//States
const[showPassword,setPasswordShow]= useState(false);
//EndPoint => name, email , password
//Refs
const nameRef= useRef();
const passwordRef= useRef();
const emailRef= useRef();

//Handlers
async function handleRegister(ev){
  ev.preventDefault();
  try {

    //Data
    const data={
      email:emailRef.current.value,
      name:nameRef.current.value,
      password:passwordRef.current.value};
      //Not Implement  Yet 
    //Call EndPoint 



  } catch (error) {
    console.log(error)
  }
}
//show/hide password
function handleTogglePassword(){
  setPasswordShow((prev)=>!prev);
}



  return (
    <div  className='overlay'>
      <Card className="auth-card p-4">
        <h4 className='mb-3 text-center'>Create Acount</h4>
      <Form onSubmit={handleRegister}>
        {/* UserName */}
        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Username'
            ref={nameRef}
          ></Form.Control>
        </Form.Group>

       
         {/* email*/}
        <Form.Group  className='mb-3'>
          <Form.Control
            type='email'
            placeholder='Email'
            ref={emailRef}
          ></Form.Control>
        </Form.Group>


      {/* password */}
        <Form.Group className='mb-3' >
          <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder='password'
                ref={passwordRef}
              />
              <InputGroup.Text  
                  style={{cursor:"pointer"}}
                  onClick={handleTogglePassword}
              >
                 {showPassword ? <FaEyeSlash /> :  <FaEye/>}   
              </InputGroup.Text>

          </InputGroup>
          
        </Form.Group>


         {/*Confirm  password */}
        <Form.Group className='mb-3' >
          <Form.Control
            type='password'
            placeholder='Confirm password'
            ref={passwordRef}
          ></Form.Control>
        </Form.Group>


          <Button type='submit' variant="primary" className="w-100 mb-2">
            Register
          </Button>


          <Button
            variant="light"
            className="w-100"
            onClick={onClose}>
            Cancel
          </Button>
      </Form>
    </Card>
</div>
  )
}
