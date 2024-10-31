import axios from "axios";
import { useEffect, useState } from "react";
import { setStatus } from "../states/statusSlice";
  
// Course API
export const getCourses = (token, updated) => {
  const [courses, setCourses] = useState([])

  const getCoursesApi = async() => {
    await axios.get(`http://localhost:5000/courses/get-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":"application/json",
      }
    })
    .then((response) => {
      setCourses(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getCoursesApi()
  }, [updated])

  return courses
}

export const getCurrentCourse = (token, courseId) => {
  const [currentCourse, setCurrentCourse] = useState()

  const getCurrentCourseApi = async () => {
    await axios.get(`http://localhost:5000/courses/single-course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      setCurrentCourse(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getCurrentCourseApi()
  }, [courseId])

  return currentCourse
}

export const updateCourse = async(data, courseId, token) => {
  await axios.post('http://localhost:5000/courses/update-course', {
    courseId: courseId,
    data: data
  }, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
}

export const addChapter = async (data, courseId, token) => {
  await axios.post('http://localhost:5000/chapters/add-chapter', {
    courseId: courseId,
    chapterTitle: data
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  })
}

export const updateChapter = async(data, chapterId, token) => {
  await axios.post('http://localhost:5000/chapters/update-chapter', {
    chapterId: chapterId,
    data: data
  }, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
}

export const getAllChapters = (token, updated) => {
    const [chapters, setChapters] = useState([])

    const getChaptersApi = async() => {
    
      await axios.get(`http://localhost:5000/chapters`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        setChapters(response.data)
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    useEffect(() => {
        getChaptersApi()
    }, [updated])

    return chapters
}

export const getCourseChapters = async (courseId, token) => {
  
  const [chapters, setChapters] = useState()

  const getChaptersApi = async() => {
    await axios.get(`http://localhost:5000/chapters/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      setChapters(response.data)
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getChaptersApi()
  }, [courseId])

  return chapters

}

// set chapter status
export const setCourseStatus = async (dispatch, token, courseId) => {
  await axios.post('http://localhost:5000/courses/update-status', { courseId: courseId, status: 'Published' }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => {
    dispatch(setStatus({ newStatusValue: true }))
    console.log(response.data);
  })
  .catch((error) => {
    dispatch(setStatus({ newStatusValue: false }))
    console.log(error);
  })
}