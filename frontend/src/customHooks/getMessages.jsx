import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers,setUserData } from '../redux/userSlice'
import { serverUrl } from '../main'
import { setMessages } from '../redux/messageSlice'



const useGetMessages = () => {
  const dispatch = useDispatch()
  const { userData,selectedUser } = useSelector(state => state.user)

  useEffect(() => {
    if (!selectedUser?._id) return 

    const fetchMessages = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`, { withCredentials: true })
        dispatch(setMessages(result.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchMessages()
  }, [selectedUser,userData])
}

export default useGetMessages
