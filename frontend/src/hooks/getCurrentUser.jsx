import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'   

const useCurrentUser = () => {


    // yeh sab is liye ky jab current user login ho to wo signin or signup py na ja saky or agar user login nahi to wo home page 
    // py na ja saky

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser()
  }, [])   
}

export default useCurrentUser
