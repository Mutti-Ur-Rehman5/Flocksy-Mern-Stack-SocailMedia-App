import React, { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../src/App'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData,setUserData } from '../src/redux/userSlice'
import { IoArrowBackCircle } from "react-icons/io5";
import dp from "../src/assets/dp.webp"

const Profile = () => {
  const { Username } = useParams()
  const dispatch = useDispatch()
  const { profileData } = useSelector(state => state.user)

     const handleLogout=async()=>{
        try{
            const result=await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
            dispatch(setUserData(null))
            console.log(result.data)

        }
        catch(error){
            console.log(error)


        }


    }

  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getProfile/${Username}`,
        { withCredentials: true }
      )
      console.log("API Response:", result) 
      dispatch(setProfileData(result.data))
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleProfile()
  }, [Username,dispatch])

  return (
    <div  className='w-full min-h-screen bg-black'>
      <div className='text-white w-full h-[80px] flex justify-between items-center px-[30px]'>

    <div><IoArrowBackCircle className='text-white w-[25px] h-[25px]'/></div>
    <div className='font-semibold  text-[20px]' >   {profileData?.Username}</div>
    <div  className='font-semibold cursor-pointer text-[20px] text-blue-500'onClick={handleLogout} >Logout</div>

      </div>
      <div className='w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center'>

            <div className='w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden' >
                      <img src={profileData?.profileImage||dp} alt="" className='w-full object-cover'/>  
                       </div>
                       <div>

                       </div>
      </div>

      
      
    </div>
  )
}

export default Profile
