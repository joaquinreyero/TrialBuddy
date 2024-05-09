import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Landing } from '../landing/pages/Landing';

import { SignIn } from '../auth/pages/SignIn';
import { SignUp } from '../auth/pages/SignUp';

import { Payment } from '../payment/pages/Payment';

import { Home } from '../home/pages/Home';
import { Profile } from '../home/pages/Profile';
import { Trials } from '../home/pages/Trials';

import { NotFound } from '../404';

import { ProtectedRoute } from './ProtectedRoute';

import axios from 'axios';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const isAuthenticated = async () => {
  try {
    const token = getCookie('token');
    const response = await axios.post(
      'http://localhost:8001/api/v1/auth/',
      {
        token,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al verificar la autenticación:', error);
    return false;
  }
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/payment" element={<Payment />} />

      <Route
        path="/trials"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Trials />
          </ProtectedRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
