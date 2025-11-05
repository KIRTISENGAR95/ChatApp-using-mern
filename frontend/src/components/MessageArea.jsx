import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.webp";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice"; // assuming the action is exported from here

function MessageArea() {
  let {selectedUser}=useSelector(state=>state.user);
  let dispatch=useDispatch();
  return (
    <div className={`lg:w-[70%] relative ${selectedUser?"flex":"hidden"} lg:flex w-full h-full bg-slate-200 border-l-2 border-gray-300`}>
      {selectedUser && <div className='w-full h-[100px] bg-[#1797c2] shadow-gray-400 shadow-lg gap-[20px] flex items-center px-[20px]'>
        <div className="flex items-center gap-4 mt-[20px]">
          <div className="cursor-pointer" onClick={()=>dispatch(setSelectedUser(null))}>
            <IoIosArrowRoundBack className="w-[40px] h-[40px] text-white" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg">
              <img src={selectedUser?.image || dp} alt="" className="h-[100%]" />
            </div>
            <h1 className="text-white font-semibold text-[20px]">{selectedUser?.name || "user"}</h1>
          </div>
        </div>
      </div>}
      {!selectedUser && <div className='w-full h-full flex  flex-col justify-center items-center '>
        <h1 className='text-gray-700 font-bold text-[50px]'>welcome to Talkify</h1>
        <span className='text-gray-700 font-semibold text-[30px]'>Talk with Friendly !</span>
      </div>}

      <div className='w-full h-[100px] fixed bottom-[20px] '>
        <form className='w-[95%] max-w-[60%] h-[60px] bg-[#1797c2]'></form>
      </div>
    </div>
  )
}

export default MessageArea