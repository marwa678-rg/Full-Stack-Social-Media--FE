import React from 'react'
import{PublicNavbar}from"../../Components/Navbar/PublicNavbar/PublicNavbar";
import { Outlet } from 'react-router-dom';
export const PublicLayout = () => {
  return (
    
    <>
    <PublicNavbar/>
    <Outlet/>
    
    
    </>
  )
}
