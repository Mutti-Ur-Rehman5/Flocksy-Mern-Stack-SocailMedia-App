import React from 'react'
import Feed from '../src/components/Feed'
import LeftHome from '../src/components/LeftHome'
import RightHome from '../src/components/RightHome'

const Home = () => {
  return (
    <div className='w-full flex justify-center items-center' >
      <LeftHome/>
      <Feed/>
      <RightHome/>
        
      
    </div>
  )
}

export default Home
