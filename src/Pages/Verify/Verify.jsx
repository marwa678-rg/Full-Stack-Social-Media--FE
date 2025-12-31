import React, { useEffect, useRef } from 'react'
//CSS imports
import "../../styles/auth.css"
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../utilis/errorHandler';
import { api } from '../../API/apis';
import toast from 'react-hot-toast';

export const Verify = () => {

//navigate
const navigate=useNavigate();
//refs
const otpRef=useRef(null);
//get verifyemail 
const storedEmail = localStorage.getItem("verifyEmail")
useEffect(()=>{

//check storedEmail
if(!storedEmail){
  navigate("/register")
}
  
},[storedEmail,navigate]);

//_____________________________handlers__________________________________//

//handleSubmit
async function handleSubmit(e){
e.preventDefault();
//data
const otp=otpRef.current.value;
const email=storedEmail;
if(!otp){
  toast.error("Please enter otp");
  return;
}
try {
  //Call end point => /api/v1/auth/verify-otp
const response = await api.post("/api/v1/auth/verify-otp",{otp,email})
toast.success(response.data?.message);

//clear verifyemail 
localStorage.removeItem("verifyEmail")


//navigate login route
navigate("/login");


} catch (error) {
  handleError(error);
}

}

//----------------------------------------------------------------//

//handle resend
async function handleResend(){
  try {
    //call end point =>/api/v1/auth/resendOtp
    const response = await api.post("/api/v1/auth/resendOtp",{email:storedEmail});

    toast.success(response.data?.message);
  } catch (error) {
    handleError(error);
  }

}


  return (
<section className='auth-page'>
    <Container>
      <div className='auth-wrapper'>
        <Card className='auth-card'>
          <Card.Body>
            <h3 className='text-center fw-bold mb-2'>
              Verify your email
            </h3>

    
            <Form onSubmit={handleSubmit}>

<Form.Group className='mb-4'>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                     value={storedEmail ||""}
                      readOnly
                    />
                </Form.Group>





                <Form.Group className='mb-4'>
                    <Form.Control
                      type="text"
                      placeholder="Enter 6-digits code"
                     ref={otpRef}
                      required
                    />
                </Form.Group>

                <Button type="submit" className='w-100 auth-btn' >
                    Verify 
                </Button>
            </Form>
        <div className='text-center mt-3'>
          <small className='text-muted'>
            Didn't receive the code ? {""}
            <button
              onClick={handleResend}
              style={{
                border:"none",
                background:"none",
                color:"#7c3aed",
                fontWeight:600,
              }}>
                Resnd OTP
              </button>
          </small>
        </div>
      </Card.Body>
      </Card>
    </div>
</Container>

















</section>
  )
}
