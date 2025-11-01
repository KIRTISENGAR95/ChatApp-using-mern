import React, { useState } from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import dp from "../assets/dp.webp"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import {BiLogOutCircle} from "react-icons/bi"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setOtherUsers, setUserData } from '../redux/userSlice'
import { serverUrl } from '../config/config'



function SideBar() {
    let {userData, otherUsers} = useSelector(state=>state.user)
    let [search,setSearch] = useState(false)
    let dispatch= useDispatch()
    let navigate = useNavigate()

    const handleLogOut=async()=>{
      try {
        let result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
        dispatch(setUserData(null))
        dispatch(setOtherUsers(null))
        navigate("/login")
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="lg:w-[30%] w-full h-full bg-slate-200">
      <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-[#20c7ff] shadow-gray-500 text-gray-700 cursor-pointer shadow-lg fixed bottom-[20px] left-[10px]' onClick={handleLogOut}>
        <BiLogOutCircle className='w-[25px] h-[25px]' />
      </div>
      <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]'>
        <h1 className='text-white font-bold text-[25px]'>ChatApp</h1>
        <div className='w-full flex justify-between items-center'>
        <h1 className='text-gray-800 font-bold text-[25px]'>Hii  , {userData.name}</h1>
        <div className='w-[60px] h-[60px] rounded-full overflow-hidden justify-center items-center shadow-gray-500 shadow-lg' onClick={()=>setSearch(true)}>
            <img src = { dp} alt = "" className='h-[100%]'/>
        </div>
        </div>
        <div className='flex items-center gap-[12px] mt-[10px]'>
          {!search ? (
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 cursor-pointer shadow-lg' onClick={()=>setSearch(true)}>
              <IoIosSearch className='w-[25px] h-[25px]' />
            </div>
          ) : (
            <form className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px]'>
              <IoIosSearch className='w-[25px] h-[25px]' />
              <input type="text" placeholder='search users...' className='w-full h-full p-[10px] text-[17px] outline-0 border-0' />
              <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={()=>setSearch(false)} />
            </form>
          )}
          {otherUsers?.map((user, idx)=> (
            <div key={idx} className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center'>
              <img src={user.image || dp} alt='' className='h-[100%] w-full object-cover' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar