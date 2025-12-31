
//Imports
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PublicLayout } from './Layouts/PublicLayout/PublicLayout'
import { AppLayout } from './Layouts/AppLayout/AppLayout'
import{Landing}from"./Pages/Landing/Landing";
import { Login } from './Pages/Login/Login';
import { Verify } from './Pages/Verify/Verify';
import{Register}from"./Pages/Register/Register";
import{Feed}from"./Pages/Feed/Feed";
import{Profile}from"./Pages/Profile/Profile";
import{ForgotPassword}from"./Pages/ForgotPassword/ForgotPassword";
import{ProtectedLayout}from"./Layouts/ProtectedLayout/ProtectedLayout";
import { Toaster } from 'react-hot-toast';
import { ResetPassword } from './Pages/ResetPassword/ResetPassword';

export default function App() {






  return (
    <>

        {/*  Toaster  */}
      <Toaster position="top-left"/>

    <Routes>
      
      {/* Public Pages */}
      <Route element={<PublicLayout/>} >
        <Route path="/" element={<Landing/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="/verify" element={<Verify/>}/>
      
      </Route>
                      {/* protected Pages */}
    {/* App Pages */}
    <Route element={<ProtectedLayout/>}>
        <Route element={<AppLayout/>}>
            <Route path="/feed" element={<Feed/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Route>
    </Route>
    


    </Routes>



</>

  )
}
