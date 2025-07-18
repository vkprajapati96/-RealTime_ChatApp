import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import dp from "../assets/dp.webp"


function ReceiverMessage({image,message}) {
let scroll = useRef()
    const {userData,selectedUser} =useSelector(state=>state.user)



useEffect(()=>{
    scroll.current.scrollIntoView({behavior:"smooth"})

},[message,image])

const handdleImageScroll =()=>{
    scroll.current.scrollIntoView({behavior:"smooth"})
    
}

  return (

    <div className='flex items-start gap-[10px]' >
       <div className="cursor-pointer w-[40px] h-[40px] rounded-full object-cover border-2 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center shadow-gray-500">
        <img
        src={selectedUser.image || dp}
        alt="Profile"
        className="h-[100%]"
        />
        </div>

           <div ref={scroll} className='w-fit max-w-[500px] bg-[rgb(23,151,194)] py-[10px] px-[20px] text-white text-[19px] rounded-tl-none rounded-2xl relative left-0 shadow-gray-400 shadow-lg flex flex-col gap-[10px]'> 
   
           {image  &&   <img src={image} alt="" className='w-[150px] rounded-lg' onLoad={handdleImageScroll} />}
   
            {message &&  <span >{message}</span>} 
           </div>
     
   
       </div>
   
  )

}


export default ReceiverMessage


