import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './customHooks/getCurrentUser'
import getOtherUsers from './customHooks/getOtherUsers'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import {io} from "socket.io-client"
import { serverUrl } from './config/config';
import { useDispatch } from 'react-redux';
import { setSocket, setOnlineUsers } from './redux/userSlice';

function App(){
  getCurrentUser()
  getOtherUsers()
  let {userData,socket,onlineUsers} = useSelector(state=>state.user)
  let dispatch=useDispatch()

  useEffect(()=>{
    if(userData){
      const socketio=io(`${serverUrl}`,{
        query:{
          userId:userData?._id
        }
      })
      dispatch(setSocket(socketio))
      socketio.on("getOnlineUsers",(users)=>{
        dispatch(setOnlineUsers(users))
      })
      return ()=>socketio.close()
    }else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
    
  },[userData])
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