import React from 'react'
import {useSelector} from 'react-redux'
import dp from "../assets/dp.webp"
function SideBar() {
    let {userData} = useSelector(state=>state.user)
  return (
    <div className="lg:w-[30%] w-full h-full bg-slate-200">
      <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col gap-[20px] justify-center px-[20px]'>
        <h1 className='text-white font-bold text-[25px]'>ChatApp</h1>
        <div className='w-full justify-between items-center'>
        <h1>Hii  , {userData.name}</h1>
        <div className='w-[60px] h-[60px] rounded-full overflow-hidden justify-center items-center shadow-gray-500 shadow-lg'>
            <img src = {userData.image || dp} alt = "" className='h-[100%]'/>

        </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar