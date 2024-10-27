const User = require("../models/users");

const updateUser = async (courseId, userId) => {
    const userFound = await User.findById(userId)
    
    if (!userFound) {
      console.log('user not found');
    }else{
      userFound.enrolledCourses = [...userFound.enrolledCourses, {courseId: courseId, progress: 0}]
      await userFound.save()
    }
  }

module.exports = updateUser;