
import React, { useState } from 'react'
import { Navbar } from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import RegisterModel from './Components/Auth/RegisterModel';
import LoginModel from './Components/Auth/LoginModel';
import { Toaster } from 'react-hot-toast';

export default function App() {
  //modals states  
const [showLogin,setLoginShow] = useState(false);
const[showRegister,setRegisterShow] = useState(false);




  return (
<>
{/* Navbar */}
<Navbar  onRegisterClick={()=>{
  setRegisterShow(true);
  setLoginShow(false);
  }}
  
        onLoginClick={()=>{
          setLoginShow(true);
          setRegisterShow(false);
        }}/>

  <Toaster position="top-left"/>      

{/* pages */}
<Routes>
  <Route path="/" Component={Home}/>
</Routes>

{/* Register Modal */}
{showRegister && (
  <RegisterModel onClose={()=>setRegisterShow(false)}/>
)}


{/* login Modal */}
{showLogin &&(
  <LoginModel onClose={()=>setLoginShow(false)}/>
)}

</>
  )
}
