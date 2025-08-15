import React, { useState } from 'react'
import { ClipLoader } from "react-spinners"
import axios from 'axios'
import { serverUrl } from "../src/App";

const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [inputClicked, setinputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmNewPassword: false
  })

  const [email, setemail] = useState("")
  const [loading, setLoading] = useState(false)
  const [otp, setOTP] = useState("")
  const [newPassword, setnewPassword] = useState("")
  const [ConfirmNewPassword, setConfirmNewPassword] = useState("")

  const handleStep1=async ()=>{
    setLoading(true)
    try{
      const result=await axios.post(`${serverUrl}/api/auth/sendOtp`,{email},{withCredentials:true})
      console.log(result.data)
      setStep(2)
      setLoading(false)
    }
    catch(error){
      console.log(error)
        setLoading(false)

    }
  }

    const handleStep2=async ()=>{
        setLoading(true)
    try{
      const result=await axios.post(`${serverUrl}/api/auth/VerifyOtp`,{email,otp},{withCredentials:true})
      console.log(result.data)
      setStep(3)
        setLoading(false)

    }
    catch(error){
      console.log(error)
        setLoading(false)

    }
  }


   const handleStep3=async ()=>{
      setLoading(true)
    try{

      if(newPassword!==ConfirmNewPassword){
        setLoading(false)
        return console.log("Password doesnot match")
      }
      const result=await axios.post(`${serverUrl}/api/auth/resetPassword`,{email,password:newPassword},{withCredentials:true})
      console.log(result.data)
        setLoading(false)

    }
    catch(error){
      console.log(error)
        setLoading(false)

    }
  }
  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>

      {step == 1 &&
        <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl justify-center items-center flex flex-col border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
          <div
            className='relative flex items-center justify-center w-[90%] h-[50px] rounded-2xl mt-[10px] border border-black'
            onClick={() => setinputClicked({ ...inputClicked, email: true })} >
            <label htmlFor="name" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
              ${inputClicked.email ? "top-[-15px]" : ""}`}>
              Enter your email
            </label>
            <input
              type="email"
              id='name3'
              className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0'
              required
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </div>
          <button
            className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]'
            disabled={loading} onClick={handleStep1}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
          </button>
        </div>
      }

      {step == 2 &&
        <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl justify-center items-center flex flex-col border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
          <div
            className='relative flex items-center justify-center w-[90%] h-[50px] rounded-2xl mt-[10px] border border-black'
            onClick={() => setinputClicked({ ...inputClicked, otp: true })} >
            <label htmlFor="otp" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
              ${inputClicked.otp ? "top-[-15px]" : ""}`}>
              Enter OTP
            </label>
            <input
              type="text"
              id='otp'
              className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0'
              required
              onChange={(e) => setOTP(e.target.value)}
              value={otp}
            />
          </div>
          <button
            className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]'
            disabled={loading} onClick={handleStep2}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Submit"}
          </button>
        </div>
      }

      {step == 3 &&
        <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl justify-center items-center flex flex-col border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Reset Password</h2>

          <div
            className='relative flex items-center justify-center w-[90%] h-[50px] rounded-2xl mt-[10px] border border-black'
            onClick={() => setinputClicked({ ...inputClicked, newPassword: true })} >
            <label htmlFor="newPassword" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
              ${inputClicked.newPassword ? "top-[-15px]" : ""}`}>
              Enter new Password
            </label>
            <input
              type="text"
              id='newPassword'
              className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0'
              required
              onChange={(e) => setnewPassword(e.target.value)}
              value={newPassword}
            />
          </div>

          <div
            className='relative flex items-center justify-center w-[90%] h-[50px] rounded-2xl mt-[10px] border border-black'
            onClick={() => setinputClicked({ ...inputClicked, confirmNewPassword: true })} >
            <label htmlFor="ConfirmNewPassword" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
              ${inputClicked.confirmNewPassword ? "top-[-15px]" : ""}`}>
              Confirm new Password
            </label>
            <input
              type="text"
              id='ConfirmNewPassword'
              className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0'
              required
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={ConfirmNewPassword}
            />
          </div>

          <button
            className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]'
            disabled={loading} onClick={handleStep3}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Reset Password"}
          </button>
        </div>
      }

    </div>
  )
}

export default ForgotPassword
