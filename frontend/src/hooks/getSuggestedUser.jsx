import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setSuggestedUsers,setUserData} from '../redux/userSlice'   

const SuggestedUser = () => {


  const dispatch = useDispatch()
  const {userData}=useSelector(state=>state.user)  //suggested user id ky sath change

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/suggested`, { withCredentials: true })
        dispatch(setSuggestedUsers(result.data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser()
  }, [userData])   
}

export default SuggestedUser
