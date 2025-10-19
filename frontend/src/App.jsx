import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Home from './/pages/Home'
import Profile from './pages/Profile'

function App(){
  getCurrentUser()
  let {userData} = useSelector(state=>state.user)
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={!userData?<Login />:<Navigate to="/home" />} />
      <Route path="/signup" element={!userData?<SignUp />:<Navigate to="/profile" />} />
      <Route path="/home" element={userData?<Home />:<Navigate to="/login"  />} />
      <Route path="/profile" element={userData?<Profile />:<Navigate to="/signup" />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
export default App