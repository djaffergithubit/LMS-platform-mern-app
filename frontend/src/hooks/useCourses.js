import axios from "axios"
import { useState } from "react"

// export const useCourses = (token) => {
//     const [courses, setCourses] = useState([])
  
//     const getCoursesApi = async() => {
//       await axios.get(`http://localhost:5000:/courses/get-course`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type":"application/json",
//         }
//       })
//       .then((response) => {
//         setCourses(response.data)
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//     }
  
//     useEffect(() => {
//       getCoursesApi()
//     }, [])

//     return use
  
//   }