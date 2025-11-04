import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers } from '../redux/userSlice'
import { serverUrl } from '../main'

const useOtherUsers = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/others`, { withCredentials: true })
        dispatch(setOtherUsers(result.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [userData])
}

export default useOtherUsers
