import React, { useRef, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { api } from '../../API/apis';
import { handleError } from '../../utilis/errorHandler';
import toast from 'react-hot-toast';

export const ForgotPassword = () => {
//Refs
const emailRef=useRef(null);
//states
const[sent, setSent]=useState(false);
const[loading,setLoading]=useState(false)
//Handlers
async function handleSubmit(e){
  e.preventDefault();
  //DATA
  const email=emailRef.current.value;
  try {

    setLoading(true)
    //call API
  const response = await api.post("/api/v1/auth/forgotPassword",{email})
  setSent(true);
toast.success(response.data?.message);
  } catch (error) {
    handleError(error);
  }finally{
    setLoading(false)
  }
  
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
                 disabled={loading || sent}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" className='w-100 auth-btn'disabled={loading ||sent}>
               {loading ? "sending..." : "send Reset Link"}
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
