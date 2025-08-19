import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RiFolderVideoLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import dp from "../assets/dp.webp"
const Nav = () => {
  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center
    
    fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>
        <div>
            <FaHome className='text-white w-[25px] h-[25px]' />
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
        <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden' >
                        <img src={dp} alt="" className='w-full object-cover'/>  
                    </div>
      
    </div>
  )
}

export default Nav
