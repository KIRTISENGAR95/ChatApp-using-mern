import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.webp";

function MessageArea() {
  return (
    <div className="lg:w-[70%] hidden lg:flex w-full h-full bg-slate-200 border-l-2 border-gray-300">
      <div className='w-full h-[100px] bg-[blue] shadow-gray-400 shadow-lg gap-[20px]flex items-center px-[20px]'>
        <div className="flex items-center gap-4 mt-[20px]">
          <div className="cursor-pointer">
            <IoIosArrowRoundBack className="w-[40px] h-[40px] text-white" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg">
              <img src={dp} alt="" className="h-[100%]" />
            </div>
            <h1 className="text-white font-semibold text-[20px]">user</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageArea