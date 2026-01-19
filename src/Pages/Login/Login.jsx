import React, { useRef, useState } from 'react'
import { Button, Card, Container, Form, InputGroup } from 'react-bootstrap'
//CSS
import "../../styles/auth.css"
import"./login.css";
import loginImg from"../../assets/login.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { handleError } from '../../utilis/errorHandler';
import { api } from '../../API/apis';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';

export const Login = () => {
//refs
const emailRef = useRef(null);
const passwordRef= useRef(null);
const [loading,setLoading]= useState(false);
//states
const [showPass,setShowPass]=useState(false);

//navigate
const go = useNavigate();
//Global 
const dispatch = useDispatch();

//____________________________Handlers____________________________//


async function handleSubmit(e){
  e.preventDefault();
if(loading)return 

setLoading(true);
//data
const data = {
 password:passwordRef.current.value,
  email:emailRef.current.value,
}
try {
  
//call endpoint =>/api/v1/auth/login
const response= await api.post("/api/v1/auth/login",data)

toast.success(response.data?.message);

//Save token
localStorage.setItem("token",response.data.token);
//update user in Redux
dispatch(setUser(response.data.user));
//navigate
go("/profile")

} catch (error) {
  handleError(error);
}finally{
  setLoading(false);
}
}


//---------------------------------------------------------------------------//

  return (
   
    <section className=' auth-page login-page'>
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
              <Form onSubmit={handleSubmit}>

                {/* email */}
                <Form.Group className='mb-3'>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                    
                  />
                </Form.Group>



                {/*password*/}
                <Form.Group className='mb-3'>
                  <InputGroup>
                  
                  <Form.Control
                    type={showPass ? "text":"password"}
                    placeholder="Password"
                    ref={passwordRef}
                    
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
              <Button type="submit" className='w-100 auth-btn' disabled={loading}>
               {loading ? "Logging in ..." :"Login"}
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
