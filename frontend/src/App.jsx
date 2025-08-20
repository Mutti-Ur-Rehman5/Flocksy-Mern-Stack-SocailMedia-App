import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'  
import SignUp from '../pages/SignUp'
import Signin from '../pages/Signin'
import Home from "../pages/Home"
import Profile from '../pages/Profile'
import ForgotPassword from '../pages/ForgotPassword';
import { useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'
import getSuggestedUser from "./hooks/getSuggestedUser"

export const serverUrl = "http://localhost:8000";

const App = () => {
  getCurrentUser()
  getSuggestedUser()
  const { userData } = useSelector(state => state.user) // useSelector hook to access redux data

  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path='/signin' element={!userData ? <Signin /> : <Navigate to="/" />} />
      <Route path='/forgotPassword' element={!userData ? <ForgotPassword /> : <Navigate to="/" />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to="/signin" />} />
      <Route  path='/profile/:Username' element={userData?<Profile/>:<Navigate to={"/signin"}/>}/>
    </Routes>
    
  )
}

export default App
