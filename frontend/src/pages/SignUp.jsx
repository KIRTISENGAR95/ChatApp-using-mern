import React from 'react'

function SignUp(){
  return (
    <div className='w-full h-[100vh] bg-slate-300 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[10px]'>
        <div className='w-full h-[200px] bg-[#19cdff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
          <h1 className='text-gray-600 font-bold text-[30px]'>welcome to <span className='text-white'> ChatApp</span></h1>
        </div>
        <form className='w-full flex flex-col gap-[20px] items-center'>

        <input type="text" placeholder='username' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]'/>
        <input type="email" placeholder='email' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]'/>
        <input type="password" placeholder='password' className='w-[90%] h-[0px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]'/>

      </form>
      </div>
    </div>
  )
}
export default SignUp
