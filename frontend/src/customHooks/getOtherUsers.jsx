import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherUsers } from '../redux/userSlice'
import { serverUrl } from '../main'

const setOtherUsers = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/others`, { withCredentials: true })
        dispatch(getOtherUsers(result.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])
}

export default getOtherUsers