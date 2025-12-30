import React, { useRef, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'

export const ForgotPassword = () => {
//Refs
const emailRef=useRef(null);
//states
const[sent, setSent]=useState(false);

//Handlers
async function handleSubmit(e){
  e.preventDefault();
  //DATA
  const email=emailRef.current.value;
  //call API
  setSent(true);
}






  return (
   <section className='auth-page'>
    <Container>
      <div className='auth-wrapper'>
        <Card className='auth-card'>
          <Card.Body>
            <h3 className='text-center fw-bold mb-2'>
              Forgot Password
            </h3>
            <p className='text-center text-muted mb-4'>
              Enter your email and we 'll send you a reset link
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-4'>
                <Form.Control 
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Button type="submit" className='w-100 auth-btn'>
                Send Reset Link
              </Button>

            </Form>
              {sent && (
                <p className='text-succes text-center mt-3'>
                  if this email ,you will receive a reset link.
                </p>
              )}

               <div className="text-center mt-3">
                <small className="text-muted">
                  Remember your password?{" "}
                  <a href="/login" style={{ color: "#7c3aed", fontWeight: 600 }}>
                    Login
                  </a>
                </small>
              </div>


          </Card.Body>


        </Card>
      </div>
    </Container>


   </section>
    
  )
}
