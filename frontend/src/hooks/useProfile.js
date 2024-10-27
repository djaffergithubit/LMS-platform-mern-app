import axios from "axios"
import { useEffect, useState } from "react"
import { socket } from "../socket"

export const useProfile = (token) => {
    const [user, setUser] = useState()
    
    const getUser = async () => {    
      await axios.get('http://localhost:5000/users/me', {
        headers:{
          Authorization: `Bearer ${token}`
        }     
      })
      .then((response) => {
        setUser(response.data)
      })
      .catch((err) => {
        console.log(err);
      })
    }
  
    useEffect(() => {
      getUser()
      socket.on('chapter completed', (message) => {
        console.log(message);
        getUser()
      })

      socket.on('enroll free course', (message) => {
        getUser()
      })

      return () => {
        socket.off('chapter completed')
      }

    }, [token])
  
    return user
  }