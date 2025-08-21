import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RiFolderVideoLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import dp from "../assets/dp.webp"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Nav = () => {
    const navigate=useNavigate()
    const {userData}=useSelector(state=>state.user)
  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center
    
    fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>
        <div  onClick={()=>navigate("/")}>
            <FaHome className='text-white w-[25px] h-[25px] cursor-pointer' />
        </div>
        <div>
            <FaSearch className='text-white w-[25px] h-[25px]' />

        </div>
        <div>
            <RiFolderVideoLine className='text-white w-[25px] h-[25px]'/>

        </div>
        <div>
            <FaPlus className='text-white w-[25px] h-[25px]' />
        </div>
        <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'
         onClick={()=>navigate (`/profile/${userData.Username}`)
        } >
                        <img src={userData.profileImage||dp} alt="" className='w-full object-cover'/>  
                    </div>
      
    </div>
  )
}

export default Nav
