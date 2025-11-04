import axios from 'axios';
import { useEffect, useState } from 'react';
import { BiLogOutCircle } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dp from "../assets/dp.webp";
import { serverUrl } from '../config/config';
import { setOtherUsers, setUserData } from '../redux/userSlice';



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

    useEffect(()=>{
      console.log(userData);
    })

  return (
    <div className="lg:w-[30%] w-full h-full bg-slate-200">
      <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-[#20c7ff] shadow-gray-500 text-gray-700 cursor-pointer shadow-lg fixed bottom-[20px] left-[10px]' onClick={handleLogOut}>
        <BiLogOutCircle className='w-[25px] h-[25px]' />
      </div>
      <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]'>
        <h1 className='text-white font-bold text-[25px]'>ChatApp</h1>
        <div className='w-full flex justify-between items-center'>
        <h1 className='text-gray-800 font-bold text-[25px]'>Hii  , {userData.name}</h1>
        <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg' onClick={()=>navigate("/profile")}>
            {
              /* Use absolute URL as-is (e.g., Cloudinary), otherwise prefix serverUrl for local files */
            }
            <img
              src={userData?.image ? (userData.image.startsWith('http') ? userData.image : `${serverUrl}/${userData.image}`) : dp}
              alt=""
              className='h-[100%] w-full object-cover'
            />
        </div>
        </div>
        <div className='w-full flex items-center gap-[20px] '>
          {!search &&
            <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 cursor-pointer shadow-lg' onClick={()=>setSearch(true)}>
              <IoIosSearch className='w-[25px] h-[25px]' />
            </div>}
            {search && 
              <form className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px]'>
              <IoIosSearch className='w-[25px] h-[25px]' />
              <input type="text" placeholder='search users...' className='w-full h-full p-[10px] text-[17px] outline-0 border-0' />
              <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={()=>setSearch(false)} />
            </form>
            }
           
          {!search && otherUsers?.map((user)=> (
            <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 bg-white shadow-lg'>
              <img
                src={user?.image ? (user.image.startsWith('http') ? user.image : `${serverUrl}/${user.image}`) : dp}
                alt=''
                className='h-[100%] w-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='w-full h-[60vh] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]'>
        {otherUsers?.map((user)=> (
          <div className='w-[95%] h-[60px] mt-[10px] flex items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full hover:bg-[#b2ccdf] cursor-pointer'>
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 bg-white shadow-lg'>
              <img
                src={user?.image ? (user.image.startsWith('http') ? user.image : `${serverUrl}/${user.image}`) : dp}
                alt=''
                className='h-[100%] w-full object-cover'
              />
            </div>
            <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
            </div>
          ))}
      </div>
      
    </div>
  )
}

export default SideBar