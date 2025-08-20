import React, { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../src/App'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData,setUserData } from '../src/redux/userSlice'
import { IoArrowBackCircle } from "react-icons/io5";
import dp from "../src/assets/dp.webp"
import Nav from '../src/components/Nav'

// in React && means if left side condtion true only then render right side
 //return (
//   <h1>Hello</h1>
//   <p>World</p>
// ) wrong

// fragments allow to return multiple
//  <>
//     <h1>Hello</h1>
//     <p>World</p>
//   </>
// ) now this is right



const Profile = () => {
  const Navigate=useNavigate()
  const { Username } = useParams()
  const dispatch = useDispatch()
  const { profileData,userData } = useSelector(state => state.user)

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

    <div><IoArrowBackCircle className='text-white w-[25px] h-[25px] cursor-pointer'onClick={()=>Navigate("/")}/></div>
    <div className='font-semibold  text-[20px]' >   {profileData?.Username}</div>
    <div  className='font-semibold cursor-pointer text-[20px] text-blue-500'onClick={handleLogout} >Logout</div>

      </div>
      <div className='w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] 
      pt-[20px] px-[10px] justify-center'>

    <div className='w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2
     border-black rounded-full cursor-pointer overflow-hidden' >
    <img src={profileData?.profileImage||dp} alt="" className='w-full object-cover'/>  
     </div>
     

     <div>
      <div className='font-semibold text-[22px] text-white'>
      {profileData?.name}

    </div>
    <div className=' text-[17px] text-[#ffffffc7]'>
      {profileData?.profession||"New User"}
    </div>
    <div className='text-[17px] text-[#ffffffc7]' >{profileData?.bio}</div>

     </div>

      </div>

      <div className='w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white'>
        <div>
          <div className='text-white text-[22px] md:text-[30px] font-semibold'>{profileData?.posts.length}</div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Posts</div>
        </div>

        <div>
          <div className='flex items-center justify-center gap-[20px]'>
            <div className='flex relative'>
              
                 <div className='w-[40px] h-[40px] border-2
     border-black rounded-full cursor-pointer overflow-hidden' >
    <img src={profileData?.profileImage||dp} alt="" className='w-full object-cover'/>  
     </div>
            <div className='w-[40px] h-[40px]  border-2
     border-black rounded-full cursor-pointer absolute left-[9px] overflow-hidden' >
    <img src={profileData?.profileImage||dp} alt="" className='w-full object-cover'/>  
     </div>
            <div className='w-[40px] h-[40px]  absolute left-[18px] border-2
     border-black rounded-full cursor-pointer overflow-hidden' >
    <img src={profileData?.profileImage||dp} alt="" className='w-full object-cover'/>  
     </div>
     
              
            </div>
            <div className='text-white text-[22px] md:text-[30px] font-semibold'>
              {profileData?.followers.length}
            </div>
          </div>
          <div  className='text-white text-[22px] md:text-[30px] font-semibold'>Followers</div>
        </div>
        <div>
          <div className='flex items-center justify-center gap-[20px]'>
             <div className='flex relative'>
              
                 <div className='w-[40px] h-[40px] border-2
     border-black rounded-full cursor-pointer overflow-hidden' >
    <img src={profileData?.profileImage||dp} alt="" className='w-full object-cover'/>  
     </div>
            <div className='w-[40px] h-[40px]  border-2
     border-black rounded-full cursor-pointer absolute left-[9px] overflow-hidden' >
    <img src={profileData?.profileImage||dp} alt="" className='w-full object-cover'/>  
     </div>
            <div className='w-[40px] h-[40px]  absolute left-[18px] border-2
     border-black rounded-full cursor-pointer overflow-hidden' >
    <img src={profileData?.profileImage||dp} alt="" className='w-full object-cover'/>  
     </div>
     
              
            </div>
             <div className='text-white text-[22px] md:text-[30px] font-semibold'>
              {profileData?.following.length}
            </div>
            </div>
            
          <div className='text-white text-[22px] md:text-[30px] font-semibold'>Following</div>
        </div>

      </div>
      <div className='w-full h-[80px] flex justify-center items-center gap-[20px] mt-[11px]'>
        {profileData?._id==userData._id && 
        <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl'>Edit Profile</button>
        
        }

        {profileData?._id!=userData._id &&
        <>
         <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl'>Follow</button>
        <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl'>Message</button>
         </>
        
        }



      </div>

      <div className='w-full min-h-[100vh] flex justify-center '>
        <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px]'>
          <Nav/>

        </div>

      </div>

      </div>
  )
}

export default Profile
