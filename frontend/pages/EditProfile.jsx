import React from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dp from "../src/assets/dp.webp"
import { useRef } from 'react';
import { useState } from 'react';
import { serverUrl } from '../src/App';
import axios from 'axios'
import { setProfileData, setUserData } from '../src/redux/userSlice';
import { FaClipboard } from "react-icons/fa";




const EditProfile = () => {

    const imageInput=useRef()
    const {userData}=useSelector(state=>state.user)
    const Navigate=useNavigate("/profile")
    const [frontendImage, setfrontendImage] = useState(userData.profileImage||dp)
    const [backendImage, setbackendImage] = useState(null)
    const [name, setname] = useState(userData.name||"")
    const [Username, setUsername] = useState(userData.Username||"")
    const [bio, setbio] = useState(userData.bio||"")
    const [profession, setprofession] = useState(userData.profession||"")
    const [gender, setgender] = useState(userData.gender||"") 

    const dispatch=useDispatch()
    const [loading, setloading] = useState(false)


    const handleImage=(e)=>{
        const file=e.target.files[0]
        setbackendImage(file)
        setfrontendImage(URL.createObjectURL(file))

    }

    const handleProfile=async()=>{
        setloading(true)

        try{
            const formdata=new FormData()
            formdata.append("name",name)
            formdata.append("Username",Username)
            formdata.append("bio",bio)
            formdata.append("profession",profession)
            formdata.append("gender",gender)
            if(backendImage){
                formdata.append("profileImage",backendImage)
            }

            const result=await axios.post(`${serverUrl}/api/user/editProfile`,formdata,{withCredentials:true})
            dispatch(setProfileData(result.data))
            dispatch(setUserData(result.data))
            setloading(false)
            Navigate(`/profile/${userData.Username}`)



        }
        catch(error){
            console.log(error)
            setloading(false)
        }
    }
  return (
    <div className='w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] '>
    <div className='w-full h-[80px] fixed  pt-[20px] flex items-center gap-[20px]'>
        
        <IoArrowBackCircle className='text-white w-[25px] h-[25px] cursor-pointer'onClick={()=>
    Navigate(`/profile/${userData.Username}`
        
        )}/>

        <h1 className='text-white text-[20px] font-semibold'>Edit Profile</h1>
    
    </div>

    <div className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2
         border-black rounded-full cursor-pointer overflow-hidden mt-[10px] ' onClick={()=>imageInput.current.click()} > 
            <input type="file" accept='image/*' ref={imageInput} hidden onChange={handleImage}/>
        <img src={frontendImage} alt="" className='w-full object-cover'/>  
         </div>
         
         <div className='text-blue-500 cursor-pointer text-center text-[18px] font-semibold'  onClick={()=>imageInput.current.click()}>
        Change Your Profile Picture</div>

        <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl 
        px-[20px] outline-none text-white font-semibold' placeholder='Enter Your name' onChange={(e)=>setname(e.target.value)}
        
        value={name}/>
          <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl 
        px-[20px] outline-none text-white font-semibold' placeholder='Enter Your Username'  onChange={(e)=>setUsername(e.target.value)}
        
        value={Username}/>
          <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl 
        px-[20px] outline-none text-white font-semibold' placeholder='Profession'  onChange={(e)=>setprofession(e.target.value)}
        
        value={profession}/>
          <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl 
        px-[20px] outline-none text-white font-semibold' placeholder='Bio'  onChange={(e)=>setbio(e.target.value)}
        
        value={bio}/>
          <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl 
        px-[20px] outline-none text-white font-semibold' placeholder='Gender'onChange={(e)=>setgender(e.target.value)}
        
        value={gender}/> 

        <button className='px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white cursor-pointer rounded-2xl'
        
        onClick={handleProfile}
        
        >
            {loading?<FaClipboard size={30} color="black" />:"Save Profile"}
            
        </button>

         
      
    </div>
  )
}

export default EditProfile
