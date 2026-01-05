import React, { useRef, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
//CSS
import"../../styles/auth.css";
import { api } from '../../API/apis';
import toast from 'react-hot-toast';
import { handleError } from '../../utilis/errorHandler';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../Components/Loading/Loading';


export const Register = () => {
  //navigation 
  const navigate = useNavigate();
//States
const[showPass,setShowPass]=useState(false);
const[loading,setLoading]= useState(false);
//refs
const emailRef=useRef(null);
const nameRef=useRef(null);
const passwordRef = useRef(null);
//____________________handlers_____________________________//

async function handleSubmit(e){
  e.preventDefault();
  setLoading(true);
//data
const data ={
  name:nameRef.current.value,
  email:emailRef.current.value,
  password:passwordRef.current.value,
}

//endpoint => api/v1/register => accept{name,email,password}
  try {
    //call API
  const response =  await api.post("/api/v1/auth/register",data)
    //save email in storage
    localStorage.setItem("verifyEmail",data.email);


    toast.success(response.data?.message);
    //navigate to Verify otp page and delay it 

    setTimeout(() => {
  navigate("/verify");
}, 800);
    

  } catch (error) {
   handleError(error);

  }finally{
    setLoading(false);
  }

}

if(loading){
  return <Loading />
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
      ref={emailRef}
      
      ></Form.Control>
    </Form.Group>




    <Form.Group className="mb-3">
      
      <Form.Control
      type="text"
      name="name"
      placeholder="Your name"
      ref={nameRef}
      
      ></Form.Control>
    </Form.Group>


<InputGroup>
    <Form.Control
    type={showPass ? "text" :"password"}
    placeholder="password"
    ref={passwordRef}
    
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
