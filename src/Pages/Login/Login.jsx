import React, { useRef, useState } from 'react'
import { Button, Card, Container, Form, InputGroup } from 'react-bootstrap'
//CSS
import "../../styles/auth.css"
import"./login.css";
import loginImg from"../../assets/login.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
//refs
const emailRef = useRef(null);
const passwordRef= useRef(null);
//states
const [showPass,setShowPass]=useState(false);

//navigate
const go = useNavigate();
// check token 
const token=localStorage.getItem("token");
if(token){
  return <Navigate t0="/feed" replace/>
}


//Handlers
async function handleSubmit(e){
  e.preventDefault();
//data
const email=emailRef.current.value;
const password=passwordRef.current.value;

}

  return (
   
    <section className='auth-page login-page'>
      <div className='login-layout'>
{/*_____________ image Side________________________ */}
      <div className='login-image'>
        <img src={loginImg} alt='login illustration'/>
      </div>

{/*_______________form side_______________________  */}

    <div className='login-form'>
      <Container>
        <div className='auth-wrapper'>
          <Card className='auth-card'>
            <Card.Body>
              <h3 className='text-center fw-bold mb-2'>
                Welcome Back
              </h3>
              <p className='text-center text-muted mb-4'>
                Login to continue
              </p>
              <Form>
                {/* email */}
                <Form.Group className='mb-3'>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                    required
                  />
                </Form.Group>



                {/*password*/}
                <Form.Group className='mb-3'>
                  <InputGroup>
                  
                  <Form.Control
                    type={showPass ? "test":"password"}
                    placeholder="Password"
                    ref={passwordRef}
                    required
                  />
                  <InputGroup.Text
                   onClick={()=>{setShowPass(!showPass)}}
                   style={{cursor:"pointer"}}
                   >
                      {showPass ? <FaEyeSlash /> : <FaEye />}

                   </InputGroup.Text>
                
                  
                  </InputGroup>
                  
              </Form.Group>   

              {/* button of submit */}
              <Button type="submit" className='w-100 auth-btn'>
                Login
              </Button>

              </Form>

            {/* _________forgot-password______________ */}

            <div className='text-center mt-3'>
              <small className='text-muted'>
                Forgot your password ?{" "}
              </small>
                 <span
                        style={{
                          color: "#7c3aed",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        onClick={() => go("/forgot-password")}
                      >
                        Forgot-Password 
                      </span>

            </div>

            <div className="text-center mt-3">
  <small className="text-muted">
    Don’t have an account?{" "}
    <Link to="/register" style={{ color: "#7c3aed", fontWeight: 600 }}>
      Sign up
    </Link>
  </small>
</div>




            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>




    </div>
      
      
    </section>
  )
}
