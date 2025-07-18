import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';
import { useDispatch } from 'react-redux';
import { setSelectedUser, setUserData } from '../redux/userSlice';

function Login() {
  const navigate  =  useNavigate()
  const dispatch =   useDispatch();
    const [show ,setshow] =useState(false);
        const [email ,setEmail] =useState("");
        const [password ,setPassword] =useState("");
        const [loading ,setLoading] =useState(false);
        const [err ,setErr] =useState("");
    
    //  funcation 
     const handleLogin = async (e) =>{
      e.preventDefault()
      setLoading(true)
try {
  
  let  result =await axios.post(`${serverUrl}/api/auth/login`,{email,password},{
    withCredentials:true
  }) 
  // console.log(result)
  dispatch(setUserData(result.data))
  dispatch(setSelectedUser(null))
    navigate("/")
    setEmail("");
    setPassword("");
    setLoading(false)
    setErr("")
} catch (error) {
  console.log(error);
      setLoading(false)
setErr(error.response?.data?.message || "Something went wrong");

}

    }
  
    

  return (
    <div className='w-full  h-[100vh] bg-slate-200  flex items-center justify-center' >
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[40px]'>
            <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center '>
                <div>

                <h1 className='font-serif text-gray-600 font-bold text-[30px]'>Login to  <span className='text-white'>TΛLKZΞN </span></h1>
                <h6 className='font-serif text-[13px] text-center'>"Let your heart speak — welcome to TalkZen."


                </h6>
                </div>
            </div>

            {/* form  */}

            <form onSubmit={handleLogin} className=' w-full flex flex-col gap-[30px] items-center'> 
                {/* email */}
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" autoComplete="email" placeholder='email'className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
                rounded-lg shadow-gray-200 shadow-lg
                ' />
                    {/* password */}
                <div className='w-[90%] h-[50px] border-2 border-[#20c7ff]  overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative' >

                <input onChange={(e)=>setPassword(e.target.value)} value={password} type={`${show ? "text" : "password" }`}   autoComplete="new-password"
 placeholder='password' className='w-full h-full outline-none px-[20px] py-[10px] bg-[white] text-gray-700 
                rounded-lg 
                '/>
                <span onClick={()=>setshow(prev=>!prev)} className='cursor-pointer font-serif absolute top-[10px] right-[20px] text-[18px] text-[#20c7ff]'>{`${show ? "hidden" : "show" }`}</span>
                </div>

                {err && <p className='text-red-600 font-semibold text-[14px]'>{err}</p>}


            <button className='bg-[#20c7ff] px-[20px] py-[10px]
            rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[10px] font-semibold hover:shadow-inner
                 ' disabled={loading} >{loading ? "Loading...":"Login"}</button>
                 <p className='cursor-pointer font-serif mb-[20px]' onClick={()=>navigate("/signup")}>want to create a new account ? <span className='text-[#20c7ff] font-serif'>sign up</span></p>

            </form>

        </div>

    </div>
  )
}

export default Login
