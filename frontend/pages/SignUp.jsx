import React from 'react'
import logo from '../src/assets/logo2.png'
import logo1 from '../src/assets/logo1.png'
import { useState } from 'react'
import {IoIosEye, IoIosEyeOff} from "react-icons/io"
import axios from 'axios'
import { serverUrl } from "../src/App";



const SignUp = () => {

  const [inputClicked, setinputClicked] = useState(
    { name:false,
      Username:false,
      email:false,
      password:false

  })

  const [showPassword, setshowPassword] = useState(false)

  const [name, setname] = useState("")
  const [Username, setUsername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  // now we create function to fetch signup api

  const handleSignUp=async()=>{

    try{
     const result = await axios.post(`${serverUrl}/api/auth/signup`,
  { name, Username, email, password },
  { withCredentials: true }
);

      console.log(result.data)

    }
    catch(error){
      console.log(error)


    }
  }
  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
      <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl overflow-hidden border-2 border-[#1a1f23] flex'>
        
        <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]'>
          <div  className='flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]'>
            <span>Sign Up to</span>
            <img src={logo} alt=""  className='w-[70px]'/>
          </div>
          <div  className='relative flex items-center justify-center w-[90%] h-[50px] rounded-2xl mt-[30px] border border-black'
          onClick={()=>setinputClicked({...inputClicked,name:true})} >
            <label htmlFor="name" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
              ${inputClicked.name?"top-[-15px]":""}`
            }> Enter your name </label>
              <input type="text" id='name1' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required
              onChange={(e)=>setname(e.target.value)} value={name}
              
              />
           
          </div>
             <div  className='relative flex items-center justify-center w-[90%] h-[50px] rounded-2xl mt-[10px] border border-black'
          onClick={()=>setinputClicked({...inputClicked,userName:true})} >
            <label htmlFor="name" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
              ${inputClicked.userName?"top-[-15px]":""}`
            }> Enter your Username </label>
              <input type="text" id='name2' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required
                  onChange={(e)=>setUsername(e.target.value)} value={Username}
              
              
              />
           
          </div>
             <div  className='relative flex items-center justify-center w-[90%] h-[50px] rounded-2xl mt-[10px] border border-black'
          onClick={()=>setinputClicked({...inputClicked,email:true})} >
            <label htmlFor="name" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
              ${inputClicked.email?"top-[-15px]":""}`
            }> Enter your email </label>
              <input type="email" id='name3' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required
                  onChange={(e)=>setemail(e.target.value)} value={email}
              />
           
          </div>
             <div  className='relative flex items-center justify-center w-[90%] h-[50px] rounded-2xl mt-[10px] border border-black'
          onClick={()=>setinputClicked({...inputClicked,password:true})} >
            <label htmlFor="name" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
              ${inputClicked.password?"top-[-15px]":""}`
            }> Enter your password </label>
              <input type={showPassword?"text":"password"} id='name' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required
                  onChange={(e)=>setpassword(e.target.value)} value={password}
              />
              
              {!showPassword?<IoIosEye  className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={()=>setshowPassword(true)} />:
               <IoIosEyeOff  className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={()=>setshowPassword(false)} />}
           
          </div>

          <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' 

          
          onClick={handleSignUp}
          
          >Sign up</button>
          <p className='cursor-pointer text-gray-800' >Already Have an Account? <span className=' border-b-2 border-b-black pb-[3px]'>Sign In</span></p>
          
        </div>

        
        <div className='hidden lg:flex w-[50%] h-full justify-center items-center bg-black flex-col gap-[10px]
        text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'>

          <img src={logo1} alt="" className='w-[40%]' />
          <p>Not just a platform,Its a Vibe</p>
          
          
        </div>
      </div>
    </div>
  )
}

export default SignUp
