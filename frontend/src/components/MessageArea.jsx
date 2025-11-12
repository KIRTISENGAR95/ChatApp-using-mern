import React, { useState, useRef, useEffect } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.webp";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice"; 
import { setMessages } from '../redux/messageSlice'; 
import {RiEmojiStickerLine} from "react-icons/ri"
import {FaImages} from "react-icons/fa6"
import {RiSendPlane2Fill} from "react-icons/ri"
import EmojiPicker from 'emoji-picker-react'
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import { serverUrl } from '../config/config';
import axios from 'axios';

function MessageArea() {
  const {selectedUser,userData,socket}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const [showPicker,setShowPicker]=useState(false);
  const [input,setInput]=useState("");
  
  const [backendImage, setBackendImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const image=useRef();
  const {messages}=useSelector(state=>state.message);

  
  useEffect(() => {
    if (!selectedUser) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/message/${selectedUser._id}`, { withCredentials:true });
        dispatch(setMessages(res.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [selectedUser, dispatch]);

  const handleSendMessage=async(e)=>{
    e.preventDefault()
    if(input.length==0 && !backendImage){
      return
    }
    try {
      const formData=new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData, { withCredentials:true });
      dispatch(setMessages([...(messages || []), result.data]));
      setInput("");
      setBackendImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const onEmojiClick=(emojiData)=>{
    setInput(prevInput=>prevInput+emojiData.emoji);
    setShowPicker(false);
  };

  const handleImage=(e)=>{
    const file=e.target.files[0];
    if(file){
      setBackendImage(file);
      const reader=new FileReader();
      reader.onloadend=()=>setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(()=>{
    socket.on("newMessage",(mess)=>{
      dispatch(setMessages([...messages,mess]))
    })
    return ()=>socket.off("newMessage")
  },[messages,socket])

  return (
    <div className={`lg:w-[70%] relative ${selectedUser?"flex":"hidden"} lg:flex w-full h-full bg-slate-200 border-l-2 border-gray-300`}>
      {selectedUser && 
      <div className='w-full h-[100vh] flex flex-col'>
        <div className='w-full h-[100px] bg-[#1797c2] shadow-gray-400 shadow-lg gap-[20px] flex flex-col items-center px-[20px]'>
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
        </div>

        <div className='w-full h-[550px] flex flex-col py-[30px] px-[20px] overflow-auto gap-[20px] pb-[120px]'>
          {showPicker && <div className='absolute bottom-[120px] left-[20px]'><EmojiPicker width={250} height={350} className='shadow-lg z-[100]' onEmojiClick={onEmojiClick}/></div>}
          
          {messages && messages.map((mess)=>(
            mess.sender=== userData._id?
              <SenderMessage key={mess._id} image={mess.message.image} message={mess.message.text}/>:
              <ReceiverMessage key={mess._id} image={mess.message.image} message={mess.message.text}/>
          ))}
        </div>
      </div>
      }

      {!selectedUser && <div className='w-full h-full flex  flex-col justify-center items-center '>
        <h1 className='text-gray-700 font-bold text-[50px]'>welcome to Talkify</h1>
        <span className='text-gray-700 font-semibold text-[30px]'>Talk with Friendly !</span>
      </div>}
      
      {selectedUser && <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center '>
        {previewImage && <img src={previewImage} alt="preview" className='w-[80px] absolute bottom-[100px] right-[20%] rounded-lg shadow-gray-400 shadow-lg'/>}
        <form className='w-[95%] lg:w-[70%] h-[60px] bg-[#1797c2] shadow-gray-400 shadow-lg rounded-full flex items-center gap-[20px] px-[20px]' onSubmit={handleSendMessage}>
          <div onClick={()=>setShowPicker(prev=>!prev)}>
            <RiEmojiStickerLine className='w-[25px] h-[25px] text-white cursor-pointer'/>
          </div>
          <input type="file" accept="image/*" ref={image} hidden onChange={handleImage}></input>
          <input type="text" className='w-full h-full px-[10px] outline-none border-0 text-[19px] text-white bg-transparent placeholder-white' placeholder='Message' onChange={(e)=>setInput(e.target.value)} value={input}/>
          <div onClick={()=>image.current.click()} >
            <FaImages className='w-[25px] h-[25px] cursor-pointer text-white'/>
          </div>

          {(input.length>0 || backendImage) && <button type="submit">
            <RiSendPlane2Fill className='w-[25px] cursor-pointer h-[25px] text-white'/>
            </button>}
          
        </form>
      </div>}
    </div>
  );
}

export default MessageArea;
