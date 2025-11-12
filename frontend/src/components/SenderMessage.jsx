import React, { useRef, useEffect } from "react";
import dp from "../assets/dp.webp"
function SenderMessage({ image,message }) {
  let scroll=useRef();
  useEffect(()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"});
  },[message,image])
  return (
    <div className='w-fit max-w-[500px] px-[20px] py-[10px] bg-[rgb(23,151,194)] text-white text-[19px] rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-lg gap-[10px] flex flex-col'ref={scroll}>
       {image &&  <img src={image} alt="" className='w-[150px] rounded-lg'></img>}
        {message && <span >{message}</span>}
    
    </div>
  );
}
export default SenderMessage;