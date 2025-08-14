import React, { useState } from 'react'
import {ClipLoader} from "react-spinners"

const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [inputClicked, setinputClicked] = useState({
    email:false
  })

  const [email, setemail] = useState("")
    const [loading, setLoading] = useState(false)

  return (
    


            <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
      {step ==1 && 
        <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl justify-center items-center flex flex-col border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
           <div className='relative flex items-center justify-center w-[90%] h-[50px] rounded-2xl mt-[10px] border border-black'
            onClick={() => setinputClicked({ ...inputClicked, email: true })} >
            <label htmlFor="name" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
              ${inputClicked.email ? "top-[-15px]" : ""}`
            }> Enter your email </label>
            <input type="email" id='name3' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required
              onChange={(e) => setemail(e.target.value)} value={email}
            />
          </div>
             <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]'
                      disabled={loading}
                    >
                      {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
                    </button>
     
      
     </div>} 
     

    </div>
    

    
  )
}

export default ForgotPassword
