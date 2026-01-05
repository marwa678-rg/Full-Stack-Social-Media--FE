// Imports
import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { Landing } from "./Pages/Landing/Landing";
import { Login } from './Pages/Login/Login';
import { Register } from "./Pages/Register/Register";
import { Feed } from "./Pages/Feed/Feed";
import { UserProfile } from './Pages/UserProfile/UserProfile';
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./Pages/ResetPassword/ResetPassword";
import { Verify } from "./Pages/Verify/Verify";

import { api } from './API/apis';
import { setUser } from './store/slices/userSlice';
import { handleError } from './utilis/errorHandler';
import { PublicNavbar } from './Components/Navbar/PublicNavbar/PublicNavbar';

export default function App() {
  const { isLoggedIn,user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function validateToken() {
      if (!token) return;

      try {
        const response = await api.get("/api/v1/auth/myInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setUser(response.data.user|| response.data));
      } catch (error) {
        handleError(error);
        localStorage.removeItem("token");
      }
    }

    validateToken();
  }, [dispatch, token]);
  return (
    <>
      <Toaster position="top-left" />
        <PublicNavbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/profile" />}
        />

        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/profile" />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify" element={<Verify />} />

        {/* Protected */}
        <Route
          path="/profile"
          element={isLoggedIn ? <UserProfile /> : <Navigate to="/login" />}
        />

        <Route
          path="/feed"
          element={isLoggedIn ? <Feed /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}
