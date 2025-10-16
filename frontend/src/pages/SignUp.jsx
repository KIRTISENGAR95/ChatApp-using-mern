import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
function SignUp(){
  let navigate = useNavigate()
  let [show, setShow] = useState(false)
  return (
    <div className='w-full h-[100vh] bg-slate-300 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[10px]'>
        <div className='w-full h-[200px] bg-[#19cdff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
          <h1 className='text-gray-600 font-bold text-[30px]'>welcome to <span className='text-white'> ChatApp</span></h1>
        </div>
        <form className='w-full flex flex-col gap-[20px] items-center'>

        <input type="text" placeholder='username' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]'/>
        <input type="email" placeholder='email' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]'/>

        <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>
          <input type={`${show ? "text":"password"}`} placeholder='password' className='w-full h-full outline-none px-[20px] py-[10px] bg-[white] shadow-gray-200 shadow-lg text-gray-700 text-[19px]'/>
          <span className='absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] font-semibold' onClick={()=>setShow(prev=>!prev )}>{`${show?"hidden":"show"}`}</span>
        </div>

        <button className='px-[20px] py-10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner'>Sign Up</button>

        <p className='cursor-pointer' onClick={()=>navigate("/login")}>Already have an Account ? <span className='text-[#20c7ff] text-[bold]'>Login</span></p>
      </form>
      </div>
    </div>
  )
}
export default SignUp
