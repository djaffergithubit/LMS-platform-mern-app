import axios from "axios"
import { useEffect, useState } from "react"

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
    }, [token])
  
    return user
  }