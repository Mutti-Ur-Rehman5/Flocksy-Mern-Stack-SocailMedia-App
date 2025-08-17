import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import Signin from '../pages/Signin'
import Home from "../pages/Home"
import ForgotPassword from '../pages/ForgotPassword';
import { useSelector } from 'react-redux'
export const serverUrl = "http://localhost:8000";

const App = () => {
  const { userData } = useSelector(state => state.user) // useSelector hook to access redux data
  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Home />} />
      <Route path='/signin' element={!userData ? <Signin /> : <Home />} />
      <Route path='/forgotPassword' element={!userData ? <ForgotPassword /> : <Home />} />
      <Route path='/' element={userData ? <Home /> : <Signin />} />
    </Routes>
  )
}

export default App
