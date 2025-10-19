import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../main'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Login(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [loading,setLoading]=useState(false)
  const [err,setError]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
  const handleLogin=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const result=await axios.post(`${serverUrl}/api/auth/login`,{
        email,
        password
      },{withCredentials:true})
      dispatch(setUserData(result.data))
      setEmail("")
      setPassword("")
      setLoading(false)
      setError("")
    }catch(error){
      console.log(error)
      setError(error?.response?.data?.message || "Login failed")
      setLoading(false)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-slate-300 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[10px]'>
        <div className='w-full h-[200px] bg-[#19cdff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
          <h1 className='text-gray-600 font-bold text-[30px]'>Login to <span className='text-white'> ChatApp</span></h1>
        </div>
        <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleLogin}>

        <input type="email" placeholder='email' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]' onChange={(e)=>setEmail(e.target.value)} value={email}/>

        <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>
          <input type={`${show ? "text":"password"}`} placeholder='password' className='w-full h-full outline-none px-[20px] py-[10px] bg-[white] shadow-gray-200 shadow-lg text-gray-700 text-[19px]'onChange={(e)=>setPassword(e.target.value)} value={password}/>
          <span className='absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] font-semibold cursor-pointer' onClick={()=>setShow(prev=>!prev )}>{`${show?"hidden":"show"}`}</span>
        </div>
        {err && <p className='text-red-500 '>{"*" +err}</p>}
        <button type='submit' className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner' disabled={loading}>{loading?"Loading...":"Login"}</button>

        <p className='cursor-pointer' onClick={()=>navigate("/signup")}>Want to create a new Account ? <span className='text-[#20c7ff] font-bold'>Login</span></p>
      </form>
      </div>
    </div>
  )
}
export default Login
