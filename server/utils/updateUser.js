const User = require("../models/users");

const updateUser = async (courseId, userId) => {
    const userFound = await User.findById(userId)
    
    if (!userFound) {
      console.log('user not found');
    }else if(!userFound.enrolledCourses.find(course => (course.courseId).toString() === courseId)){
      userFound.enrolledCourses = [...userFound.enrolledCourses, {courseId: courseId, progress: 0}]
      await userFound.save()
    }else{
        console.log('course already enrolled');
    }
  }

module.exports = updateUser;