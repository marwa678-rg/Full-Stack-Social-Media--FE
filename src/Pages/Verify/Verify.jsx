import React, { useRef } from 'react'
//CSS imports
import "../../styles/auth.css"
import { Button, Card, Container, Form } from 'react-bootstrap'

export const Verify = () => {
//states
//refs
const otpRef=useRef(null);
const emailRef=useRef(null);
const storedEmail = localStorage.getItem("verifyEmail")
//_____________________________handlers__________________________________//

//handleSubmit
async function handleSubmit(e){
e.preventDefault();

}

//handle resend
async function handleResend(){

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
                      ref={emailRef}
                      required
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
