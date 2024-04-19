
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Landing } from '../landing/pages/Landing'

import { SignIn } from '../auth/pages/SignIn'
import { SignUp } from '../auth/pages/SignUp'

import { Payment } from '../payment/pages/Payment'

import { Home } from '../home/pages/Home'
import { Profile } from '../home/pages/Profile'
import { Trails } from '../home/pages/Trails'

import { NotFound } from '../404'


const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Landing />}/>

        <Route path='/SignIn' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>

        <Route path='/payment' element={<Payment />} />

        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/trails' element={<Trails />} />

        <Route path='/*' element={ <NotFound /> } />
    </Routes>
  )
}

export default AppRouter